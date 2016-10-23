'use strict';

require('dotenv').config();
var validate = require('validate.js');
var model = require('./model');
var client = require('./client');


module.exports.handler = (event, context, callback) => {

    // build model
    var status = Object.assign(model.schema, event.data);

    // validate model
    var invalid = validate(status, model.constraints, {format: 'flat'});
    if (invalid) client.error(callback, invalid, "Validation");

    else {
        var statusPayload = {
            TableName: `${process.env.STAGE}-Statuses`,
            Item: status
        };

        client.put(statusPayload)
            .then(() => {
                return client.success(callback, status);
            })
            .catch(error => {
                return callback(error);
            })
    }
};
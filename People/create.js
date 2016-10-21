'use strict';

require('dotenv').config();
var validate = require('validate.js');
var model = require('./model');
var client = require('./client');


module.exports.handler = (event, context, callback) => {

    // build model
    var person = Object.assign(model.schema, event.data);

    // validate model
    var invalid = validate(person, model.constraints, {format: 'flat'});
    if (invalid) client.error(callback, invalid, "Validation");

    else {
        var personPayload = {
            TableName: `People-${process.env.STAGE}`,
            Item: person
        };

        client.put(personPayload)
            .then(() => {
                return client.success(callback, person);
            })
            .catch(error => {
                return callback(error);
            })
    }
};
'use strict';

require('dotenv').config();
var validate = require('validate.js');
var model = require('./model');
var client = require('./client');
var attr = require('dynamodb-data-types').AttributeValue;

module.exports.handler = (event, context, callback) => {

    // build model
    var person = Object.assign(model.schema, event.data);
    var wrappedPerson = attr.wrap(person);

    // validate model
    var invalid = validate(person, model.constraints, {format: 'flat'});
    if (invalid) client.error(callback, invalid, "Validation");

    else {
        var personPayload = {
            TableName: `${process.env.STAGE}-People`,
            Key: {id: wrappedPerson.id, repId: wrappedPerson.repId},
        };

        client.delete(personPayload)
            .then(() => {
                return client.success(callback, person);
            })
            .catch(error => {
                return callback(error);
            })
    }
};
'use strict';

require('dotenv').config();
var validate = require('validate.js');
var model = require('./model');
var client = require('./client');
var attr = require('dynamodb-data-types').AttributeValue;

module.exports.handler = (event, context, callback) => {

    var errors;
    var document;

    // check for dynamic constraints
    checkForDynamicConstraints(event)
        .then(response => {

            var dynamicConstraints = {};
            if (response) {
                var data = JSON.parse(response.Payload);
                dynamicConstraints = data.success ? data.results : {};
            }

            // build model
            document = Object.assign(model.schema, event.data);
            var wrappedDocument = attr.wrap(document);

            // validate model
            var invalid = validate(document, Object.assign(model.constraints, dynamicConstraints), {format: 'flat'});
            if (invalid) {
                errors = invalid;
                throw new Error('Invalid');
            }

            // build update
            var updates = [];
            var values = {};
            var count = 0;

            for (var key in document) {
                if (document.hasOwnProperty(key)) {
                    if (model.keys.indexOf(key) < 0) {
                        updates.push(`${key}=:value${count}`);
                        values[`:value${count}`] = wrappedDocument[key];
                    }
                    count++;
                }
            }

            var documentPayload = {
                TableName: `Documents-${process.env.STAGE}`,
                Key: {id: wrappedDocument.id, docType: wrappedDocument.docType},
                UpdateExpression: `SET ${updates.toString()}`,
                ExpressionAttributeValues: values
            };

            return client.update(documentPayload)
        })
        .then(() => {
            return client.success(callback, document);
        })
        .catch(error => {
            if (error.message === 'Invalid') return client.error(callback, errors, "Invalid");
            return callback(error);
        })
};

function checkForDynamicConstraints(event) {

    if (event.data && event.data.docType && event.data.docStatus && event.data.docStatus === 'complete') {
        return client.invoke(`templates-${process.env.STAGE}-constraints`, {data: {docType: event.data.docType}})
    }

    return new Promise((resolve) => {
        return resolve(null)
    })
}
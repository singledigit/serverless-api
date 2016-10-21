'use strict';

require('dotenv').config();
var validate = require('validate.js');
var model = require('./model');
var client = require('./client');
var attr = require('dynamodb-data-types').AttributeValue;

module.exports.handler = (event, context, callback) => {

    var generalConstraints = model.constraints;

    // need to build a validation from the dynamic form if status is complete
    if (event.data && event.data.docStatus && event.data.docStatus === 'complete') {
        var docs = require('./forms');

        var customConstraints = {};

        var doc = docs[event.data.docType];

        console.log("doc", doc);

        doc.map(field => {
            if (field.required) customConstraints[field.propName] = {presence: true}
        });

        console.log("general constraints", generalConstraints);

        generalConstraints = Object.assign(generalConstraints, customConstraints)
    }


    // build model
    var document = Object.assign(model.schema, event.data);
    var wrappedDocument = attr.wrap(document);

    // validate model
    var invalid = validate(document, model.constraints, {format: 'flat'});
    if (invalid) client.error(callback, invalid, "Validation");

    else {

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

        client.update(documentPayload)
            .then(() => {
                return client.success(callback, document);
            })
            .catch(error => {
                return callback(error);
            })
    }
};
'use strict';

require('dotenv').config();
var validate = require('validate.js');
var model = require('./model');
var client = require('./client');


module.exports.handler = (event, context, callback) => {

    // build model
    var document = Object.assign(model.schema, event.data);

    // validate model
    var invalid = validate(document, model.constraints, {format: 'flat'});
    if (invalid) client.error(callback, invalid, "Validation");

    else {
        var documentPayload = {
            TableName: `Documents-${process.env.STAGE}`,
            Item: document,
            ConditionExpression: 'attribute_not_exists (id) and attribute_not_exists(docType)'
        };

        client.put(documentPayload)
            .then(() => {
                return client.success(callback, document);
            })
            .catch(error => {
                if(error.code === 'ConditionalCheckFailedException'){
                    return client.error(callback, "Document already exists", "Duplicate");
                }
                return callback(error);
            })
    }
};
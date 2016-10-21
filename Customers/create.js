'use strict';

require('dotenv').config();
var validate = require('validate.js');
var model = require('./model');
var client = require('./client');


module.exports.handler = (event, context, callback) => {

    // build model
    var customer = Object.assign(model.schema, event.data);

    // validate model
    var invalid = validate(customer, model.constraints, {format: 'flat'});
    if (invalid) client.error(callback, invalid, "Validation");

    else {
        var customerPayload = {
            TableName: `Customers-${process.env.STAGE}`,
            Item: customer,
            ConditionExpression: 'attribute_not_exists (id)'
        };

        client.put(customerPayload)
            .then(() => {
                return client.success(callback, customer);
            })
            .catch(error => {
                if(error.code === 'ConditionalCheckFailedException'){
                    return client.error(callback, "Customer already exists", "Duplicate");
                }
                return callback(error);
            })
    }
};
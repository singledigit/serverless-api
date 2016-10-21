'use strict';

require('dotenv').config();
var validate = require('validate.js');
var model = require('./model');
var client = require('./client');
var attr = require('dynamodb-data-types').AttributeValue;


module.exports.handler = (event, context, callback) => {

    // build model
    var customer = Object.assign(model.schema, event.data);
    var wrappedCustomer = attr.wrap(customer);

    // validate model
    var invalid = validate(customer, model.constraints, {format: 'flat'});
    if (invalid) client.error(callback, invalid, "Validation");

    else {

        // build update
        var updates = [];
        var values = {};
        var count = 0;

        for (var key in customer) {
            if (customer.hasOwnProperty(key)) {
                if (model.keys.indexOf(key) < 0) {
                    updates.push(`${key}=:value${count}`);
                    values[`:value${count}`] = wrappedCustomer[key];
                }
                count++;
            }
        }


        var customerPayload = {
            TableName: `Customers-${process.env.STAGE}`,
            Key: {id: wrappedCustomer.id},
            UpdateExpression: `SET ${updates.toString()}`,
            ExpressionAttributeValues: values
        };

        client.update(customerPayload)
            .then(() => {
                return client.success(callback, customer);
            })
            .catch(error => {
                return callback(error);
            })
    }
};
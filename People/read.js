'use strict';

require('dotenv').config();
var client = require('./client');


module.exports.handler = (event, context, callback) => {

    if (!event.customerId) client.error(callback, "Customer ID is required", "NotNull");

    let peopleParams = {
        TableName: `People-${process.env.STAGE}`,
        KeyConditionExpression: "id = :custId",
        ExpressionAttributeValues: {
            ":custId": event.customerId
        }
    };

    client.query(peopleParams)
        .then(response => {
            client.success(callback, response)
        })
        .catch(error => {
            callback(error);
        });
};
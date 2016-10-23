'use strict';

require('dotenv').config();
var client = require('./client');


module.exports.handler = (event, context, callback) => {

    if (!event.data || !event.data.customerId) client.error(callback, "Customer ID is required", "NotNull");

    let peopleParams = {
        TableName: `${process.env.STAGE}-People`,
        KeyConditionExpression: "id = :custId",
        ExpressionAttributeValues: {
            ":custId": event.data.customerId
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
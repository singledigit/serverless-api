'use strict';

require('dotenv').config();
var client = require('./client');


module.exports.handler = (event, context, callback) => {

    if (!event.customerId) client.error(callback, "Customer ID is required", "NotNull");

    let documentParams = {
        TableName: `Documents-${process.env.STAGE}`,
        KeyConditionExpression: "id = :custId",
        ExpressionAttributeValues: {
            ":custId": event.customerId
        }
    };

    client.query(documentParams)
        .then(response => {
            client.success(callback, response)
        })
        .catch(error => {
            callback(error);
        });
};
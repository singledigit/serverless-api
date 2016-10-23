'use strict';

require('dotenv').config();
var client = require('./client');

module.exports.handler = (event, context, callback) => {

    if (!event.data || !event.data.customerId) client.error(callback, "Customer ID is required", "NotNull");

    else {

        let statusParams = {
            TableName: `${process.env.STAGE}-Statuses`,
            KeyConditionExpression: "id = :custId",
            ExpressionAttributeValues: {
                ":custId": event.data.customerId
            }
        };

        client.query(statusParams)
            .then(response => {
                client.success(callback, response)
            })
            .catch(error => {
                callback(error);
            });
    }
};
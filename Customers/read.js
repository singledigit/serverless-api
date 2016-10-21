'use strict';

// environment
require('dotenv').config();
var client = require('./client');


// Primary handler
module.exports.handler = (event, context, callback) => {
    if (event.data && event.data.customerId) readOne(event, callback);
    else readAll(callback);
};


// returns full list of customers when customerID not present
function readAll(callback) {

    client.scan({TableName: `Customers-${process.env.STAGE}`})
        .then(response => {
            return client.success(callback, response)
        })
        .catch(error => {
            return callback(error);
        })
}


// returns one customer for customerId
function readOne(event, callback) {
    var customerParams = {
        TableName: `Customers-${process.env.STAGE}`,
        Key: {"id": event.data.customerId}
    };

    client.get(customerParams)
        .then(response => {
            return client.success(callback, response);
        })
        .catch(error => {
            return callback(error);
        })
}
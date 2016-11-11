'use strict';

// environment
require('dotenv').config();
var client = require('./client');

// Primary handler
module.exports.handler = (event, context, callback) => {
    if (event.data && event.data.customerId) getOne(event, callback);
    else getAll(callback);
};


// returns full list of customers when customerID not presnt
function getAll(callback) {
    var customers = [];

    client.invoke(`customers-${process.env.STAGE}-read`)
        .then(response => {

            var data = JSON.parse(response.Payload);

            if (!data.success) {
                throw new Error('Could not get Customers');
            }

            var promises = [];

            customers = data.results.Items;

            customers.map(customer => {
                promises.push(client.invoke(`people-${process.env.STAGE}-read`, {data: {customerId: customer.id}}));
                promises.push(client.invoke(`statuses-${process.env.STAGE}-read`, {data: {customerId: customer.id}}));
            });

            return Promise.all(promises);
        })
        .then(responses => {
            customers.map((customer, i) => {

                // people
                var people = JSON.parse(responses[i * 2].Payload);
                if (!people.success) {
                    throw new Error('Error getting people')
                }
                customer.people = people.results.Items;

                // status history
                var statusHistory = JSON.parse(responses[i * 2 + 1].Payload);
                if (!statusHistory.success) {
                    throw new Error('Error getting statuses')
                }
                customer.statusHistory = statusHistory.results.Items;

                // status
                customer.status = customer.statusHistory[customer.statusHistory.length - 1]
            });

            return client.success(callback, customers);
        })
        .catch(error => {
            callback(error);
        })
}


// returns one customer for customerId
function getOne(event, callback) {
    var promises = [];

    promises.push(client.invoke(`customers-${process.env.STAGE}-read`, {data: {customerId: event.data.customerId}}));
    promises.push(client.invoke(`people-${process.env.STAGE}-read`, {data: {customerId: event.data.customerId}}));
    promises.push(client.invoke(`statuses-${process.env.STAGE}-read`, {data: {customerId: event.data.customerId}}));

    Promise.all(promises)
        .then(responses => {

            // customer
            var data = JSON.parse(responses[0].Payload);
            if (!data.success) throw new Error('Error getting Customer');
            var customer = data.results.Item;

            //people
            var people = JSON.parse(responses[1].Payload);
            if (!people.success) throw new Error('Problem getting People');
            customer.people = people.results.Items;

            // statuses
            var statuses = JSON.parse(responses[2].Payload);
            if (!statuses.success) throw new Error('Error getting Statuses');
            customer.statusHistory = statuses.results.Items;
            customer.status = customer.statusHistory[customer.statusHistory.length - 1];

            return client.success(callback, [customer]);
        })
        .catch(error => {
            callback(error);
        })
}
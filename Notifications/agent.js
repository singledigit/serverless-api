'use strict';

require('dotenv').config();
var client = require('./client');

module.exports.handler = (event, context, callback) => {

    var latestDocuments = [];
    var latestStatuses = [];
    var recentStatuses = [];
    var receipts = [];
    var people = [];
    var customers = [];

    // grab message from queue
    var messageParams = {
        AttributeNames: [
            "All"
        ],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: [
            "All"
        ],
        QueueUrl: `https://sqs.us-east-1.amazonaws.com/366574430586/${process.env.STAGE}-GeneralNotifications`,
    };

    client.receiveQueueMessage(messageParams)
        .then(response => {

            if (!response.Messages) throw new Error('Empty');

            var promises = [];

            response.Messages.map(message => {

                // stores latest doc
                receipts.push(message.ReceiptHandle);
                latestDocuments.push(JSON.parse(message.MessageAttributes.Document.StringValue));

                // stores latest status
                var s = JSON.parse(message.MessageAttributes.Status.StringValue);
                latestStatuses.push(s);

                // calls for previous status
                promises.push(client.invoke(`statuses-${process.env.STAGE}-read`, {data: {customerId: s.id}}));

                // calls for people
                promises.push(client.invoke(`people-${process.env.STAGE}-read`, {data: {customerId: s.id}}));

                // calls for customer
                promises.push(client.invoke(`customers-${process.env.STAGE}-read`, {data: {customerId: s.id}}));
            });

            return Promise.all(promises);
        })
        .then(responses => {
            var notifications = [];

            // store prev Status
            var recentStatus = JSON.parse(responses[0].Payload);
            if (recentStatus.success) recentStatuses.push(recentStatus.results.Items[recentStatus.results.Items.length - 1]);

            // store people
            var p = JSON.parse(responses[1].Payload);
            if (p.success) people.push(p.results.Items);

            // store customer
            var c = JSON.parse(responses[2].Payload);
            if(c.success) customers.push(c.results.Item);

            latestStatuses.map((stat, ind) => {
                if (stat.document !== recentStatuses.document) {
                    var docParams = createParams("ChangeToDocument", latestStatuses[ind], recentStatuses[ind], latestDocuments[ind], people[ind], customers[ind]);
                    notifications.push(client.publishNotification(docParams));
                }

                if (stat.pipeline !== recentStatuses.pipeline) {
                    var pipeParams = createParams("ChangeToPipeline", latestStatuses[ind], recentStatuses[ind], latestDocuments[ind], people[ind], customers[ind]);
                    notifications.push(client.publishNotification(pipeParams));
                }

                if (latestDocuments.docStatus === 'rejected') {
                    var rejectParams = createParams("RejectedDocument", latestStatuses[ind], recentStatuses[ind], latestDocuments[ind], people[ind], customers[ind]);
                    notifications.push(client.publishNotification(rejectParams));
                }
            });

            return Promise.all(notifications);
        })
        .then(response => {
            client.success(callback, response);
        })
        .catch(error => {
            if (error.message === "Empty") client.success(callback, {});
            else callback(error);
        });

    // delete message from queue
};

function createParams(topic, latestStatus, recentStatus, document, people, customer) {

    console.log("Previous Status", recentStatus);

    return {
        TopicArn: `arn:aws:sns:us-east-1:366574430586:${process.env.STAGE}-${topic}`,
        Message: "Status update",
        MessageAttributes: {
            "Status": {
                DataType: "String",
                StringValue: JSON.stringify(latestStatus)
            },
            "PreviousStatus": {
                DataType: "String",
                StringValue: JSON.stringify(recentStatus)
            },
            "Document": {
                DataType: "String",
                StringValue: JSON.stringify(document)
            },
            "People": {
                DataType: "String",
                StringValue: JSON.stringify(people)
            },
            "Customer": {
                DataType: "String",
                StringValue: JSON.stringify(customer)
            }
        }
    };
}
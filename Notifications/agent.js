'use strict';

require('dotenv').config();
var client = require('./client');

module.exports.handler = (event, context, callback) => {

    var documents = [];
    var receipts = [];

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

                // store receipt
                receipts.push(message.ReceiptHandle);

                // store document
                var doc = JSON.parse(message.MessageAttributes.Document.StringValue);
                documents.push(doc);

                // get customers associated with documents
                promises.push(client.invoke(`customers-${process.env.STAGE}-getComplete`, {data: {customerId: doc.id}}));
            });

            return Promise.all(promises);
        })
        .then(responses => {
            var notifications = [];
            responses.map((response, ind) => {
                var cust = JSON.parse(response.Payload).results[0];

                // sends message to each person associated
                cust.people.map(person => {
                    notifications.push(client.publishNotification(determineMessage(cust, documents[ind], cust.status, cust.statusHistory[cust.statusHistory.length - 2], person)))
                })
            });
            return Promise.all(notifications);
        })
        .then(() => {
            // delete messages from queue
            var params = {
                Entries: [],
                QueueUrl: `https://sqs.us-east-1.amazonaws.com/366574430586/${process.env.STAGE}-GeneralNotifications`,
            };

            receipts.map((receipt, ind) => {
                params.Entries.push({Id: `message${ind}`, ReceiptHandle: receipt})
            });

            client.deleteQueueMessageBatch(params);
        })
        .then(response => {
            client.success(callback, response);
        })
        .catch(error => {
            if (error.message === "Empty") client.success(callback, {message: "no messages retrieved"});
            else callback(error);
        });
};


function determineMessage(customer, document, status, recentStatus, person) {
    var params = {
        TopicArn: `arn:aws:sns:us-east-1:366574430586:${process.env.STAGE}-notifier`,
        Message: '',
        Subject: '',
        MessageAttributes: {
            "Type": {
                DataType: "String",
                StringValue: 'information'
            },
            "Person": {
                DataType: "String",
                StringValue: JSON.stringify(person)
            }
        }
    };

    if (status.document !== recentStatus.document) {
        params.Subject = `${customer.companyName} has changed status`;
        params.Message = `${customer.companyName} has moved from ${recentStatus.document} to ${status.document}`;
    }

    if (status.pipeline !== recentStatus.pipeline) {
        params.Message += ` and they are now in the ${status.pipeline} pipeline`;
    }

    if (document.docStatus === 'rejected') {
        params.MessageAttributes.Type.StringValue = "warning";
        params.Message = `${customer.companyName} has a document, ${status.document} that has been rejected due to '${status.rejectReason}'`;
    }

    return params;
}



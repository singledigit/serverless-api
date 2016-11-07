'use strict';

require('dotenv').config();
var validate = require('validate.js');
var model = require('./model');
var client = require('./client');
var attr = require('dynamodb-data-types').AttributeValue;

module.exports.handler = (event, context, callback) => {

    var errors;
    var document;
    var status;

    // check for dynamic constraints
    checkForDynamicConstraints(event)
        .then(response => {

            var dynamicConstraints = {};
            if (response) {
                var data = JSON.parse(response.Payload);
                dynamicConstraints = data.success ? data.results : {};
            }

            // build model
            document = Object.assign(model.schema, event.data);
            var wrappedDocument = attr.wrap(document);

            // validate model
            var invalid = validate(document, Object.assign(model.constraints, dynamicConstraints), {format: 'flat'});
            if (invalid) {
                errors = invalid;
                throw new Error('Invalid');
            }

            // build update
            var updates = [];
            var values = {};
            var count = 0;

            for (var key in document) {
                if (document.hasOwnProperty(key)) {
                    if (model.keys.indexOf(key) < 0) {
                        updates.push(`${key}=:value${count}`);
                        values[`:value${count}`] = wrappedDocument[key];
                    }
                    count++;
                }
            }

            var documentPayload = {
                TableName: `${process.env.STAGE}-Documents`,
                Key: {id: wrappedDocument.id, docType: wrappedDocument.docType},
                UpdateExpression: `SET ${updates.toString()}`,
                ExpressionAttributeValues: values
            };

            return client.update(documentPayload)
        })
        .then(() => {
            // figures out next status
            return determineNewStatus(event, callback);
        })
        .then(response => {
            // create new status record
            return client.invoke(`statuses-${process.env.STAGE}-create`, {data: response});
        })
        .then(response => {
            // set statuc value
            var res = JSON.parse(response.Payload);
            if (res.success) {
                status = res.results.Item;
            }

            // send status notification
            var params = {
                DelaySeconds: 10,
                MessageAttributes: {
                    "Status": {
                        DataType: "String",
                        StringValue: JSON.stringify(status)
                    },
                    "Document": {
                        DataType: "String",
                        StringValue: JSON.stringify(document)
                    }
                },
                MessageBody: "Document Updated",
                QueueUrl: `https://sqs.us-east-1.amazonaws.com/366574430586/${process.env.STAGE}-GeneralNotifications`
            };

            return client.sendQueueMessage(params)
        })
        .then(() => {
            return client.success(callback, {document: document, status: status});
        })
        .catch(error => {
            if (error.message === 'Invalid') return client.error(callback, errors, "Invalid");
            return callback(error);
        })
};

function checkForDynamicConstraints(event) {

    if (event.data && event.data.docType && event.data.docStatus && event.data.docStatus === 'complete') {
        return client.invoke(`templates-${process.env.STAGE}-constraints`, {data: {docType: event.data.docType}})
    }

    return new Promise((resolve) => {
        return resolve(null)
    })
}

function determineNewStatus(event) {

    var promises = [];
    var docs;
    var statuses;
    var template;

    // get all documents and statuses for this customer
    promises.push(client.invoke(`documents-${process.env.STAGE}-read`, {data: {customerId: event.data.id}}));
    promises.push(client.invoke(`statuses-${process.env.STAGE}-read`, {data: {customerId: event.data.id}}));

    // get doc temps info
    promises.push(client.invoke(`templates-${process.env.STAGE}-read`, {data: {template: "docs"}}));

    return Promise.all(promises)
        .then(responses => {

            var newStatus = {
                id: event.data.id,
                repId: event.user.repId
            };

            var d = JSON.parse(responses[0].Payload);
            var s = JSON.parse(responses[1].Payload);
            var t = JSON.parse(responses[2].Payload);

            if (d.success) docs = d.results.Items;
            if (s.success) statuses = s.results.Items;
            if (s.success) template = t.results.Item;

            if (docs.length === 0) {
                newStatus.document = 'pd';
                newStatus.docPipeline = 'sales';
            }

            else {

                var summary = [];

                // check status of all docs
                for (var key in template) {
                    if (template.hasOwnProperty(key)) {
                        var doc = docs.filter(item => {
                            return item.docType === template[key].meta.keyName;
                        });

                        var r = {name: template[key].meta.keyName, value: true};

                        if (doc.length === 0) summary.push(r);
                        else if (doc[0].docStatus !== 'complete') summary.push(r);
                    }
                }

                var next = summary.filter(item => {
                    return item.value;
                });

                newStatus.document = next[0].name;
                newStatus.pipeline = template[next[0].name].meta.pipeline;

            }

            return new Promise((resolve) => {
                resolve(newStatus);
            })
        })
        .catch(error => {
            return error;
        })
}
'use strict';

var docs = require('./forms');
var client = require('./client');

module.exports.handler = (event, context, callback) => {

    if (!event.data || !event.data.docType) client.error(callback, "Document Type Required", "NotNull");

    else {
        try {
            var doc = docs[event.data.docType];
            client.success(callback, doc)
        }
        catch (error) {
            callback(error);
        }
    }
};
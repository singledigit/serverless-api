'use strict';

var docs = require('./forms');
var client = require('./client');

module.exports.handler = (event, context, callback) => {

    if (!event.data || !event.data.docType) client.error(callback, "Document Type Required", "NotNull");

    else {
        try {
            var docs = require('./forms');
            var doc = docs[event.data.docType];

            var customConstraints = {};

            doc.map(field => {
                if (field.required) customConstraints[field.propName] = {presence: true}
            });

            client.success(callback, customConstraints);
        }
        catch(error){
            callback(error);
        }
    }
};
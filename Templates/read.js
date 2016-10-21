'use strict';

var docs = require('./forms');
var client = require('./client');

module.exports.handler = (event, context, callback) => {

    if (!event.docType) client.error(callback, "Document Type Required", "NotNull");

    else {
        return new Promise((resolve, reject) => {
            try {
                return resolve(docs[event.docType])
            }
            catch(error){
                return reject(error)
            }
        })
    }
};
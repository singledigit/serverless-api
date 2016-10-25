'use strict';

var templates = require('./templates');
var client = require('./client');

module.exports.handler = (event, context, callback) => {

    if (!event.data || !event.data.template) client.error(callback, "Template Required", "NotNull");

    else {
        try {
            var template = templates[event.data.template];
            client.success(callback, {Item: template})
        }
        catch (error) {
            callback(error);
        }
    }
};
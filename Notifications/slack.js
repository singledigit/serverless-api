'use strict';

require('dotenv').config();
var client = require('./client');

module.exports.handler = (event, context, callback) => {
    console.log("Slack Lambda Triggered");
    console.log("Slack Event", event);
    client.success(callback, event)
};
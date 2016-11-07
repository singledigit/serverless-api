'use strict';

require('dotenv').config();
var client = require('./client');

module.exports.handler = (event, context, callback) => {
    console.log("Email Lambda Triggered");
    console.log("Email Event", event);
    client.success(callback, event)
};
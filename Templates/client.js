"use strict";

var AWS = require('aws-sdk');
var db = new AWS.DynamoDB();
var dc = new AWS.DynamoDB.DocumentClient({service: db});
var attr = require('dynamodb-data-types').AttributeValue;

function error(callback, data, type) {
    if (!type) type = null;
    if (!data) data = null;
    else if (!Array.isArray(data)) data = [data];
    callback(null, {success: false, type: type, results: data});
}

function success(callback, data) {
    if (!data) data = null;
    callback(null, {success: true, results: data})
}

function query(params) {
    return new Promise((resolve, reject) => {
        dc.query(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    });
}

function scan(params) {
    return new Promise((resolve, reject) => {
        dc.scan(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    });
}

function get(params) {
    return new Promise((resolve, reject) => {
        dc.get(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    });
}

function put(payload) {
    payload.Item = attr.wrap(payload.Item);
    return new Promise((resolve, reject) => {
        db.putItem(payload, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    })
}

function update(params) {
    return new Promise((resolve, reject) => {
        db.updateItem(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    });
}

function deleteItem(params) {
    return new Promise((resolve, reject) => {
        db.deleteItem(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    });
}

exports.error = error;
exports.success = success;
exports.query = query;
exports.scan = scan;
exports.get = get;
exports.put = put;
exports.update = update;
exports.delete = deleteItem;

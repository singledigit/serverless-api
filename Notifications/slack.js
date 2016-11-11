'use strict';

var https = require('https');
require('dotenv').config();
var client = require('./client');

module.exports.handler = (event, context, callback) => {

    // exit if no records
    if (event.Records.length === 0) client.success(callback, {message: "no messages retrieved"});

    // grab data
    else {
        var person = JSON.parse(event.Records[0].Sns.MessageAttributes.Person.Value);

        let personPayload = {
            "channel": person.slackId,
            "text": event.Records[0].Sns.Message
        };

        postMessage(personPayload)
            .then(response => {
                client.success(callback, {sent: true});
            })
            .catch(error => {
                callback(error);
            })

    }
};

function postMessage(data) {
    let dataString = JSON.stringify(data);
    let headers = {
        'Content-Type': 'application/json',
        'Content-Length': dataString.length
    };

    let options = {
        host: "hooks.slack.com",
        path: '/services/T07TWTBTP/B25RTMHE1/mgAl68JDFsyeCP4DOnKmpqGx',
        method: 'POST',
        headers: headers
    };

    return new Promise((resolve, reject) => {

        let req = https.request(options, (res) => {
            res.setEncoding('utf-8');

            let responseString = '';

            res.on('data', (data) => {
                responseString += data;
            });

            res.on('error', (error) => {
                console.log('Slack Notifier', error);
                reject()
            });

            res.on('end', () => {
                resolve()
            });
        });

        req.write(dataString);
        req.end();
    })
}
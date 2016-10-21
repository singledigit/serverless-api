var schema = {
    id: null,
    repId: null,
    date: new Date().toISOString(),
    repName: null,
    repType: null,
    slackId: null
};

var constraints = {
    id: {
        presence: true
    },
    repId: {
        presence: true
    },
    date: {
        presence: true
    },
    repName: {
        presence: true
    },
    repType: {
        presence: true
    },
    slackId: {
        presence: true
    }
};

exports.schema = schema;
exports.constraints = constraints;
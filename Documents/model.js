var keys = ["id", "docType"];

var schema = {
    id: null,
    docType:null,
    docStatus:null,
    pipeline:null
};

var constraints = {
    id: {
        presence: true
    },
    docType: {
        presence: true
    },
    docStatus: {
        presence: true
    },
    pipeline: {
        presence: true
    }
};

exports.keys = keys;
exports.schema = schema;
exports.constraints = constraints;
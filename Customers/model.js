var keys = ["id"];

var schema = {
    id: null,
    companyName:null
};

var constraints = {
    id: {
        presence: true
    },
    companyName: {
        presence: true
    }
};

exports.keys = keys;
exports.schema = schema;
exports.constraints = constraints;
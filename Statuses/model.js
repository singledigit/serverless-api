var schema = {
    id: null,
    date: new Date().toISOString(),
    document: null,
    fastTrack: false,
    pipeline: null,
    repId: null,
    rejectReason: null
};

var constraints = {
    id: {
        presence: true
    },
    date: {
        presence: true
    },
    document: {
        presence: true
    },
    pipeline: {
        presence: true
    },
    repId: {
        presence: true
    }
};



exports.schema = schema;
exports.constraints = constraints;
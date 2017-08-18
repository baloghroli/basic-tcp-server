const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientReq = new Schema({
    guid: {
        type: String,
    },
    datetime: {
        type: Date,
    }
});

module.exports = mongoose.model('ClientReq', ClientReq);

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const logSchema = new Schema({
    
    tkName: { type: String},
    tkCategory: { type: String },
    tkZones: Number,
    tkDuration: Number,
    description: String,
    tkPrice: Number,
    userID: {
        type: ObjectId,
        ref: 'User',
    },
    
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
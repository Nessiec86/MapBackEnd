const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ticketSchema = new Schema({
    
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

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
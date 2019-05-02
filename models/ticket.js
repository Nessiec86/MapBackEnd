const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ticketSchema = new Schema({
    
    tkName: { type: String},
    tkImage: { type: String },
    tkDescription:{ type: String },
    tkZones: { type: Number, enum: [1,2,3,4,5,6]},
    tkTrips: {},
    tkPrice: Number,
    userId: {
        type: ObjectId,
        ref: 'User',
    },
    
});

const Ticket = mongoose.model('Tickets', ticketSchema);

module.exports = Ticket;
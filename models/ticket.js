const mongoose = require('mongoose');
const { Schema } = mongoose;


const ticketSchema = new Schema({
    
    tkName: { type: String},
    tkImage: { type: String },
    tkDescription:{ type: String },
    tkAge: { type: String, enum: [ '16','25','60','Adult' ]},
    tkZones: { type: Number, enum: [1,2,3,4,5,6]},
    tkTrips: Number,
    tkPrice: Number,
    
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
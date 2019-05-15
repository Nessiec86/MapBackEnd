const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
  myTickets: [{
    type: ObjectId,
    ref: 'Ticket'
  }],
  myCards: [{
    type: ObjectId,
    ref: 'Card'
  }],
     
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
//exportar en routes
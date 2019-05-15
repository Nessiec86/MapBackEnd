const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const cardSchema = new Schema({
  
  cardname: { type: String, required: true, unique: true },
  cardnum: { type: Number, required: true, unique: true },
  vadil: { type: Date, required: true },
  controlnum: { type: Number, required: true },
  userId: {
    type: ObjectId,
    ref: 'User'
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
//exportar en routes
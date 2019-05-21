const express = require('express');
const router = express.Router();
const Card = require('../models/card');

// CREATE NEW CARD
router.post('/pay', (req, res, next) => {
  const { cardname, cardnum, vadil, controlnum } = req.body;
  const userId = req.session.currentUser._id;
  Card.create({
    cardname,
    cardnum,
    vadil,
    controlnum,
    userId,
  })
  .then((card) => {
    res.status(200).json(card);
  })
  .catch((error) => {
    next(error);
  });
});
   
// SHOW MY CARDS
router.get('/card/', (req, res, next) => {
  const userId = req.session.currentUser._id;
  Card.find({userId})
    .then(card => {
      res.status(200)
      res.json(card)
    })
    .catch(next)
})
    
// CARD UPDATE
router.put('/list/:id', (req, res, next) => {
  const { tkName, tkImage, tkZones, tkTrips, tkDescription, tkPrice } = req.body;
  const {id} = req.params
  const TicketUpdate = {
    tkName,
    tkImage,
    tkZones,
    tkTrips,
    tkDescription,
    tkPrice,
  }
  Ticket.findByIdAndUpdate(id, TicketUpdate)
    .then(ticket => {
      res.status(200)
      res.json({
        message: 'updated',
        ticket,
      })
    })
    .catch(next)
})
  
// DELETE CARD FROM DB
router.delete('/card/:cardId', (req, res, next) => {
  const { cardId } = req.params
  Card.findByIdAndDelete(cardId)
    .then(card => {
      res.status(200)
      res.json({
        message: 'deleted',
        card,
      })
    })
    .catch(next)
})

module.exports = router;

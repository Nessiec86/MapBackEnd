const express = require('express');
const router = express.Router();

const Card = require('../models/card');
const User = require('../models/user');

const {
    isLoggedIn,
    isNotLoggedIn,
    protectedRoute,
    anonRoute,
    checkRole,
    notifications,
  } = require('../helpers/middlewares');
  



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

   
   // SHOW CARD
   router.get('/card/', (req, res, next) => {
    const {userId} = req.session.currentUser._id;
     
    Card.find(userId)
     .then(card => {
       res.status(200)
       res.json(card)
      })
      .catch(next)
    })
    
  // SHOW MY CARDS
  router.get('/mycards', (req, res, next) => {
    const userId = req.session.currentUser._id;
    
    User.findById(userId)
    .populate('myCards')
    .then((data) => {
      res.status(200).json(myCard);
    })
      .catch((error) => {
        next(error);
     })
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
  router.delete('/list/:ticketId', (req, res, next) => {
    const {ticketId} = req.params
  
    Ticket.findByIdAndDelete(ticketId)
      .then(ticket => {
        res.status(200)
        res.json({
          message: 'deleted',
          ticket,
        })
      })
      .catch(next)
  })

  // DELETE CARD FROM USER
  router.post('/edit/:ticketId', (req, res, next) => {
    const { ticketId } = req.params
    const userId = req.session.currentUser._id;
        
        User.findByIdAndUpdate(userId, {$pull: { myTickets: ticketId }})
        .then(user => {
          res.status(200)
          res.json({
            message: 'removed',
            user,
          })
        })
        .catch(next)
   })


module.exports = router;

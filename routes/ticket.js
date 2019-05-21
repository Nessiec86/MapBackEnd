const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const User = require('../models/user');

// TICKETS LIST
router.get('/list', (req, res, next) => {
  Ticket.find()
    .then((ticket) => {
    res.status(200).json(ticket);
    })
    .catch((error) => {
      next(error);
    });
});

// CREATE NEW TICKET
router.post('/new', (req, res, next) => {
  const { tkName, tkImage, tkZones, tkTrips, tkDescription, tkAge, tkPrice } = req.body;
  Ticket.create({
    tkName,
    tkImage,
    tkZones,
    tkTrips,
    tkDescription,
    tkAge,
    tkPrice,
  })
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch((error) => {
      next(error);
    });
});

// SHOW MY FULL TICKETS
router.get('/joined', (req, res, next) => {
  const userId = req.session.currentUser._id;
    User.findById(userId)
      .then(({fullTicket}) => {
        res.status(200).json(fullTicket);
      })
      .catch((error) => {
        next(error);
     })
})
   
// SHOW TICKET
router.get('/list/:id', (req, res, next) => {
  const {id} = req.params
  Ticket.findById(id)
    .then(ticket => {
      res.status(200)
      res.json(ticket)
    })
    .catch(next)
})
    
// ADD FULL TICKET
router.put('/list/:ticketId', (req, res, next) => {
  const {ticketId} = req.params
  const userId = req.session.currentUser._id;
  Ticket.findById(ticketId)
    .then(ticket => { 
      res.status(200)
      res.json({
        message: 'Added',
        ticket
      }) 
      User.findByIdAndUpdate(userId, {$push: { fullTicket: ticket }})
        .then(user => {
          res.status(200)
          res.json({
            message: 'Added',  
            user,
          })
        })
        .catch(next)
    })
})
 
// UPDATE TRIPS
router.put('/trip/', (req, res, next) => {
  const { counter, ticketId } = req.body
  const userId = req.session.currentUser._id;
  User.findByIdAndUpdate(userId)
    .then(user => {
      user.fullTicket.forEach(element => {
        if (element._id == ticketId) {
          element.tkTrips = counter-1;
          }
          res.status(200)
          res.json({
            message: 'updated',
            user
          })
        });
    })
    .catch(next)
})

// DELETE TICKET FROM DB
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

// DELETE FULL TICKET FROM USER
router.post('/edit/:ticketId', (req, res, next) => {
  const { ticketId } = req.params
  const userId = req.session.currentUser._id;
  Ticket.findById(ticketId)
    .then(ticket => { 
      res.status(200)
      res.json({
        message: 'Removed',
        ticket
      }) 
      User.findByIdAndUpdate(userId, {$pull: { fullTicket: ticket }})
        .then(user => {
          res.status(200)
          res.json({
          message: 'Removed',  
          user,
        })
      })
      .catch(next)
    })
}) 

module.exports = router;

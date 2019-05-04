const express = require('express');
const router = express.Router();

const Ticket = require('../models/ticket');
const User = require('../models/user');

const {
    isLoggedIn,
    isNotLoggedIn,
    protectedRoute,
    anonRoute,
    checkRole,
    notifications,
  } = require('../helpers/middlewares');
  

router.get('/', (req, res, next) => {
    const userID = req.session.currentUser;
    res.redirect('user/user', { userID });
});

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
    const { tkName, tkImage, tkZones, tkTrips, tkDescription, tkPrice } = req.body;
    const userId = req.session.currentUser._id;
    Ticket.create({
      tkName,
      tkImage,
      tkZones,
      tkTrips,
      tkDescription,
      tkPrice,
      // userId,
    })
      .then((ticket) => {
        res.status(200).json(ticket);
      })
      .catch((error) => {
        next(error);
      });
  });

  // SHOW MY TICKETS
  router.get('/joined', (req, res, next) => {
    const userId = req.session.currentUser._id;
     
    
    User.findById(userId)
    .populate('myTickets')
    .then(({myTickets}) => {
      res.status(200).json(myTickets);
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
    
    // ADD TICKET
    router.put('/list/:ticketId', (req, res, next) => {
      console.log(req.params)
      const {ticketId} = req.params
      const userId = req.session.currentUser._id;
      

      User.findByIdAndUpdate(userId, {$push: { myTickets: ticketId }})
      .then(user => {
        res.status(200)
        res.json({
          message: 'Added',
          user,
        })
      })
      .catch(next)

     })

  // TICKET UPDATE
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
  
  // DELETE TICKET
  router.delete('/list/:id', (req, res, next) => {
    const {id} = req.params
  
    Ticket.findByIdAndDelete(id)
      .then(ticket => {
        res.status(200)
        res.json({
          message: 'deleted',
          ticket,
        })
      })
      .catch(next)
  })
  
  

module.exports = router;

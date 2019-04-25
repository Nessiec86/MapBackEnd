const express = require('express');
const router = express.Router();

const Ticket = require('../models/ticket');
const User = require('../models/user');

// const {
//     protectedRoute,
//     anonRoute,
//     checkRole,
//     notifications,
//   } = require('../helpers/middlewares');
  

// router.use(protectedRoute);

router.get('/', (req, res, next) => {
    const userID = res.locals.currentUser._id;
    res.redirect('user/user', { userID });
});

router.get('/tickets', (req, res, next) => {
    Ticket.find()
    .then((tickets) => {
    res.redirect('tickets/list', {tickets});
    })  
    .catch((error) => {
      next(error);
    })
});

router.get('/tickets/:id', async (req, res, next) => {
  const { id } = req.params;
  let usernames = [];
 
  try {
    const allUsers = await User.find()
    allUsers.forEach(user => {
      user.myTickets.forEach(tickets => {
        if (tickets == id) {
          usernames.push(user.username)
        }
      })
    })
    Ticket.findById(id).then(ticket => {
      res.redirect('tickets/ticket', { allUsers, id, ticket, usernames });
    });
  } catch (error) {
    next(error);
  }
});

router.post('/tickets/:id', (req, res, next) => {
  const userId = res.locals.currentUser._id;
  const {id} = req.params;
  const user = res.locals.currentUser;
  User.findByIdAndUpdate(userId, {$push: { myTickets: id }})
  .then((id) => {
         res.redirect('/user/mytickets');
        })
    .catch((error) => {
      next(error);
    })
})
  

// router.get('/joined', (req, res, next) => {
//   const userId = res.locals.currentUser._id;
//   const myTickets = res.locals.currentUser.myTickets;
//   const user = User.findById(userId).populate('myTickets')
//     .then((user) => {
//       res.redirect('tickets/myTickets', { myTickets, user })
//    })
//    .catch((error) => {
//     next(error);
//    })
//  })

//  router.post('/joined/:id/remove', async (req, res, next) => {
//   const { id } = req.params;
//   const userId = req.session.currentUser._id;
//   try {
//     await
//     User.findByIdAndUpdate(userId, { $pull: { tripJoined: id }})
//     res.redirect('/user/joined');
//   } catch (error) {
//       next(error);
//     }
//  })

// router.get('/created', (req, res, next) => {
//   const userID = res.locals.currentUser._id;
//   Trip.find({userID})
//     .then((trips) => {
//       res.render('trips/created', { trips });
//     })
//     .catch((error) => {
//       next(error);
//     })
// })

// router.get('/created/:id/update', (req, res, next) => {
//   const { id } = req.params;
//   const tripCategory = Trip.schema.obj.tripCategory.enum;
//   const difficulty = Trip.schema.obj.difficulty.enum;
//   Trip.findById(id)
//     .then((trip) => {
//       res.render('trips/update', { trip, tripCategory, difficulty });
//     })
//     .catch((error) => {
//       next(error);
//     })
// })

// router.post('/created/:id/update', (req, res, next) => {
//   const userID = res.locals.currentUser._id;
//   const { id } = req.params;
//   const { tripCategory, tripName, description, duration, necessaryEquipment, petfriendly, difficulty } = req.body;
//   Trip.findByIdAndUpdate(id, { tripCategory, tripName, description, duration, necessaryEquipment, petfriendly, difficulty })
//     .then((trip) => {
//       res.render('user/user', { userID });
//     })
//     .catch((error) => {
//       next(error);
//     })
// });

// router.post('/created/:id/delete', (req, res, next) => {
//   const userID = res.locals.currentUser._id;
//   const { id } = req.params;
//   Trip.findByIdAndRemove(id)
//    .then((trip) => {
//     res.render('user/user', { userID });
//    })
//    .catch((error) => {
//      next(error);
//    });
// });

 
router.get('/new', (req, res, next) => {
    const userID = res.locals.currentUser._id;
    const tkCategory = Trip.schema.obj.tkCategory.enum;
    const tkZones = Trip.schema.obj.tkZones.enum;
    const tkDuration = Trip.schema.obj.tkDuration;
    res.redirect('tickets/new', { userID, tkCategory, tkZones, tkDuration });
});

router.post('/new', (req, res, next) => {
    const { tkName, tkImage, tkZones, tkTrips, tkDescription, tkPrice } = req.body;
    const userID = req.session.currentUser._id;
    Ticket.create({
      tkName,
      tkImage,
      tkZones,
      tkTrips,
      tkDescription,
      tkPrice
    })
      .then((ticket) => {
        res.status(200).json(ticket);
      })
      .catch((error) => {
        next(error);
      });
  });

// router.get('/profile', (req, res, next) => {
//   const user = req.session.currentUser;
//   User.find(user)
//     .then ((user) => {
//       res.render('user/profile', {user});
//     })
//     .catch((error) => {
//       next(error);
//     })
// })

// router.get('/profile/update', (req, res, next) => {
//   const user = req.session.currentUser;
//   Trip.find(user)
//     .then((user) => {
//       res.render('user/profileupdate', { user });
//     })
//     .catch((error) => {
//       next(error);
//     })
// })

// router.post('/profile/update', (req, res, next) => {
//   const userId = req.session.currentUser._id;
//   const { firstName, surname, email } = req.body;
//   User.findByIdAndUpdate(userId, { firstName, surname, email })
//     .then((userId) => {
//       res.render('user/profile');
//     })
//     .catch((error) => {
//       next(error);
//     })
// });


module.exports = router;

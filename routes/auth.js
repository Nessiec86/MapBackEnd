const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

router.get('/me', isLoggedIn(), (req, res, next) => {
  res.json(req.session.currentUser);
});

router.post('/login', isNotLoggedIn(), validationLoggin(), 
  async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
          req.session.currentUser = user;
          return res.status(200).json(user);
      } else {
          next(createError(401));
      }
    } catch (error) {
        next(error);
    }
  },
);

router.post(
  '/signup',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { username, surname, age, email, password } = req.body;
    try {
      const user = await User.findOne({ username }, 'username');
      if (user) {
        return next(createError(422));
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, surname, age, email, password: hashPass });
        req.session.currentUser = newUser;
        res.status(200).json(newUser);
      }
    } catch (error) {
      next(error);
    }
  },
);

router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  return res.status(204).send();
});

router.get('/private', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message',
  });
});

//UPDATE TRIPS
router.put('/ticket/update/', (req, res, next) => {
  const { counter, ticketId } = req.body;
  const userId = req.session.currentUser._id;
  User.find({fullTickets: {ticketId}})
    .then(ticket => {
      res.json({
        message: 'updated',
        ticket
      })
    })
    .catch(next)
})
    
// UPDATE USER 
router.put('/profile/edit', (req, res, next) => {
  const { username, surname, age, email } = req.body;
  const userId = req.session.currentUser._id;
  const UserUpdate = {
    username,
    surname,
    age,
    email, 
  }
  User.findByIdAndUpdate(userId, UserUpdate)
    .then(user => {
      res.status(200)
      res.json({
        message: 'updated',
        user,
      })
    })
    .catch(next)
})

// SHOW MY USER
router.get('/profile/', (req, res, next) => {
  const userId = req.session.currentUser._id;
  User.findById(userId)
    .then(user => {
      res.status(200)
      res.json(user)
    })
    .catch(next)
})

module.exports = router;
const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    next(createError(401));
  }
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    next(createError(403));
  }
};

exports.validationLoggin = () => (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(createError(422))
  } else {
    next();
  }
}
exports.protectedRoute = () => (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/login');
  }
}
exports.anonRoute = () => (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/user');
  } else {
    next();
  }
}
exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.session.currentUser.role === role) {
      next();
    } else {
      res.redirect('login');
    }
  };
}
exports.notifications = () => (req, res, next) => {
  // We extract the messages separately cause we call req.flash() we'll clean the object flash.
  res.locals.errorMessages = req.flash('error');
  res.locals.infoMessages = req.flash('info');
  res.locals.dangerMessages = req.flash('danger');
  res.locals.successMessages = req.flash('success');
  res.locals.warningMessages = req.flash('warning');
  next();
}


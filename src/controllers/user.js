const User = require('../models/User');

// TODO: Refactor !

// Fetches all users from the DB
const getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if(err) {
      err = new Error("Users not found"); // TODO: Refactor error
      err.status = 404;
      return next(err);
    } else {
      res.status(200).json(users);
    }
  });
};
// Fetches all users from the DB

// Fetches user from the DB
const getUser = (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if(err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      res.status(200).json(user);
    }
  });
};
// Fetches user from the DB

// Creates a new user and saves it to the DB
const signUp = (req, res, next) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    photo: req.body.photo,
    email: req.body.email,
    password: req.body.password
  });
  
  newUser.save((err) => {
    if(err) {
      err.status = 400;
      next(err);
    } else {
      res.status(200).json(newUser);
    }
  });
};
// Creates a new user and saves it to the DB

// Authenticates the user
// TODO: Implement token (jwt)
const signIn = (req, res, next) => {
  User.authenticates(req.body.email, req.body.password, (err, user) => {
    if(err || !user) {
      err = new Error('Wrong email or password');
      err.status = 401;
      return next(err);
    } else {
      res.status(200).json(user);
    }
  });
}
// Authenticates the user

// Modifies the user info and saves the changes to the DB
const updateUser = (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if(err) return next(err);
    if(!user) return next();
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.photo = req.body.photo || user.photo;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    
    user.save((err) => {
      if(err) {
        err.status = 400;
        next(err);
      } else {
        res.status(200).json(user);
      }
    });
  });
};
// Modifies the user info and saves the changes to the DB

// Removes user from the DB
const deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.userId, (err, user) => {
    if(err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      res.status(200).json({ message: "User deleted" });
    }
  });
}
// Removes user from the DB



module.exports = {
  getAllUsers,
  getUser,
  signIn,
  signUp,
  updateUser,
  deleteUser
}

const express = require('express');

const User = require('../models/User');

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
}
// Creates a new user and saves it to the DB

module.exports = {
  signUp
}

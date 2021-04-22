const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.createuser = (req,res,next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: 'user created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Email already exists'
      });
    });
  });
}

exports.userLogin = (req, res, next) => {
  let loginUser;
  User.findOne({email: req.body.email})
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: "auth failed"
      });
    }
    loginUser = user;
    return bcrypt.compare(req.body.password, user.password)
  })
  .then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }
    const token = jwt.sign({email: loginUser.email, userId: loginUser._id},
      'secret_should_be_longer',
      {expiresIn: "1h",}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: loginUser._id
    });
  })
  .catch(err => {
      return res.status(401).json({
        message: "Invalid Credentials"
    });
  });
}

exports.userSearch = (req,res,next) => {
  User.find().then(users => {
    res.status(200).json({
      total: users.length,
      results: users
    });
  })
  .catch(err => {
    res.status(404).json({
      message: 'user not found'
    });
  });
}

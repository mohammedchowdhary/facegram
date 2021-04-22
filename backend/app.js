const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const CommentRoutes = require('./routes/comments');
const friendRoutes = require('./routes/friends');


mongoose.connect("mongodb+srv://talib:dXkQt9QW8bbY7U0R@cluster0-ycqms.mongodb.net/facegram-mean?retryWrites=true", { useNewUrlParser: true })
.then(() => {
  console.log("databse connection established");
})
.catch(() => {
  console.log("connection failed!!");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-requested-With, Content-Type, Accept, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, PUT, OPTIONS");
    next();
});

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', CommentRoutes);
app.use('/api/friends', friendRoutes);
module.exports = app;

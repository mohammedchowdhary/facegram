var User = require("../models/user");


exports.sendRequest = function(req, res) {
    User.friendRequest(req.userData.userId, req.body.userId,
      function (err, sentRequest) {
          if(err){
            res.status(500).json({
              message: 'something went wrong'
            });
            } else {
              console.log(req.body.userId);
              res.status(201).json({
                message: 'friends request sent'
              });
            }
        });
      }


exports.receivedRequests = (req,res,next) => {
    User.getReceivedRequests(req.userData.userId, function (err, receivedRequests) {
     if(err){
      res.status(500).json({
        message: 'something went wrong'
      });
        } else {
              res.status(200).json({
                total: receivedRequests.length,
                result: receivedRequests
              });
        }
    });
  }



exports.acceptRequest = (req,res,next) => {
    User.acceptRequest(req.userData.userId, req.params.id,
      function (err, acceptedFriend) {
      if(err){
        res.status(500).json({
          message: 'something went wrong'
        });
          } else {
                res.status(201).json({
                  message: 'request accepted'
                });
          }
     });
  }

  exports.sentRequests = (req,res) => {
    User.getSentRequests(req.userData.userId, function (err,sentRequests) {
      if(err){
        res.status(500).json({
          message: 'something went wrong'
        });
          } else {
                res.status(200).json({
                  message: 'sent requests fetched',
                  sentRequests: sentRequests
                });
          }
    })

  };

  exports.getFriends = function(req, res) {
     User.getFriends(req.userData.userId, function (err, friends) {
      if(err){
        res.status(500).json({
          message: 'something went wrong'
        });
          } else {
                res.status(200).json({
                  message: 'friends fetched',
                  friends: friends
                });
          }
    });
  }

  exports.cancelRequest = (req,res) => {
    User.cancelRequest(req.userData.userId, req.body.id,
      function (err, done) {
        if(err){
          res.status(500).json({
            message: 'something went wrong'
          });
            } else {
                  res.status(201).json({
                    message: 'request canceled',
                  });
            }
      });
  };

  exports.denyRequest = (req,res) => {
    User.denyRequest(req.userData.userId, req.body.id,
      function (err, denied) {
        if(err){
          res.status(500).json({
            message: 'something went wrong'
          });
            } else {
                  res.status(201).json({
                    message: 'request denied',
                  });
            }
      });
  };

  exports.removeFriend = (req,res) => {
    User.endFriendship(req.userData.userId, req.body.id,
      function (err, denied) {
        if(err){
          res.status(500).json({
            message: 'something went wrong'
          });
            } else {
                  res.status(201).json({
                    message: 'friend removed',
                  });
            }
      });
  };


// // router.post("/friends/:id", function(req, res) {
// //     User.acceptRequest(req.user._id,req.params.id, function (err, friendship) {
// //     if (err) throw err;

// //     res.redirect("/friends");
// // });
// // })



// router.get("/friends", function(req, res) {

//     User.getFriends(req.user._id, function (err, friends) {
//     if (err) throw err;

//     res.render("friends/friends", {friends: friends});
//     // friends [ { username: 'Zane', _id: 54c6eb7cf2f9fe9672b90ba3, __v: 0 } ]
// });
// });

// router.post("/remove/:id", function(req, res) {
//     User.endFriendship(req.user._id,req.params.id, function(err){
//         if(err) throw err;
//         res.redirect("/");
//     })
// })

// router.post("/denyrequest/:id", function(req, res) {
//     User.denyRequest(req.user._id,req.params.id, function (err, denied) {
//     if (err) throw err;
//     // denied 1
// });
// })

// router.get("/users", function(req,res){
//        User.find({},function(err, allUsers){
//         if(err){
//             console.log(err)
//         } else {
//                 res.render("user", {users: allUsers});
//         }
//     });
// })

const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = (req,res,next) => {
  User.findById(req.userData.userId).then(user => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
    caption: req.body.caption,
    imagePath: url + "/images/" + req.file.filename,
    creator: user._id
});
  post.save().then(
    (createdPost) => {
      console.log(createdPost);
      user.posts.push(createdPost);
      user.save().then(result => {
        res.status(201).json({
          message: 'post added successfully',
          post: {
            ...createdPost,
            postId: createdPost._id
          }
        })
      })

    }
  )
  .catch(error => {
    res.status(500).json({
      message : "Creating Post Failed"
      });
    });
  })
};


exports.updatePost = (req,res,next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creatorId: req.userData.userId,
    creatorName: req.userData.email

  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(
    result => {
      console.log(result);
      if (result.nModified > 0) {
        res.status(200).json({message: 'updated successfully!'});
      } else {
        res.status(401).json({message: 'Authorization Failed!'});
      }
    }
  )
  .catch(error => {
    res.status(500).json({
      message : "Updating Post Failed"
    });
  });
};

// exports.getPosts = (req,res,next) => {
//   const pageSize = +req.query.pageSize;
//   const currentPage = +req.query.page;


//   Post.find().populate("comments").then(documents => {
//     console.log(documents);
//     res.status(200).json({
//       message: 'fetching successfull',
//       posts: documents
//       });
//   })
//   .catch(error => {
//     res.status(500).json({
//       message : "Fetching Posts Failed"
//     });
//   });
// };

exports.getPosts = (req, res, next) => {
  Post.find()
  .populate("comments")
  .populate({path: 'creator', select: 'name profile_pic'})
  .then(documents => {
    let promises = documents.map(post => {
      return new Promise((resolve, reject) => {
        User.getFriends(req.userData.userId, function (err, friends) {
          if (err) {
            return reject(err)
          } else {
            let posts =[]
            if (friends.length === 0 && post.creator._id == req.userData.userId) {
              posts.push(post)
            } else {

            for (var i = 0; i < friends.length; i++) {
              if (post.creator._id == req.userData.userId || post.creator._id.equals(friends[i]._id)) {
                posts.push(post);
                break;
              }
            }
          }
          return resolve(posts)
        }
        });
      })
    });

    return Promise.all(promises)
  })
  .then(result => {
    let posts = []
    result.map(fposts => {
      posts = posts.concat(fposts)
    })

    return posts
  })
  .then(posts => {
    res.status(200).json({
      message: 'fetching successfull',
      posts: posts
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching Posts Failed"
    });
  });
}

exports.getPost = (req,res,next) => {
  Post.findById(req.params.id).then( post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'post not found!'});
    }
  }).catch(error => {
    res.status(500).json({
      message : "Fetching Post Failed"
    });
  });
};

exports.deletePost = (req,res,next) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId})
  .then(result => {
    if (result.n > 0) {
      res.status(200).json({message: 'Deleted successfully!'});
    } else {
      res.status(401).json({message: 'Authorization Failed!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message : "deleting Post Failed"
    });
  });
};

//------------likes------------------//
var searchId = function(arr,val)
{
  for(var i=0;i<arr.length;i++)
  {    if(arr[i].equals(val))
      {
        console.log("done already!");
        return i;
      }
  }
  return -1;
}

exports.likePost = (req,res,next) => {
  Post.findById(req.body.postId).then(post => {
    User.findById(post.creator._id).then(user => {
    if (!post) {
      res.status(404).json({
        message : 'post not found'
      });
    } else {
      if(searchId(post.likes,req.userData.userId)==-1)
  		{
        post.likes.push(req.userData.userId);
        post.save().then(likedPost => {
          user.likes += 1;
          user.save().then(result => {
            res.status(201).json({
              message: 'post Liked',
              counter: 1
            });
          });
        });

      } else {
        var index = searchId(post.likes,req.userData.userId);
        post.likes.splice(index, 1);
        post.save().then(result => {
          user.likes -= 1;
          user.save().then(result => {
            res.status(201).json({
              message: 'post Unliked',
              counter: -1
            });
          });
        });
      }
    }
  })
  }).catch(err => {
    res.status(500).json({
      message: 'liking post failed'
      });
    });
};

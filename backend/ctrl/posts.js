const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = (req,res,next) => {
  User.findById(req.userData.userId).then(user => {
    const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    caption: req.body.caption,
    imagePath: url + "/images/" + req.file.filename,
    creator: {
      id: req.userData.userId,
      username: req.userData.email
    }
});
  post.save().then(createdPost => {
      user.posts.push(createdPost);
      user.save().then(result => {
        console.log(result);
          res.status(201).json({
            message: 'post added successfully',
            post: {
              ...createdPost,
              postId: createdPost._id
            }
          });
        })
      .catch(error => {
        res.status(500).json({
          message : "Creating Post Failed"
        });
      });
    });
  });
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

exports.getPosts = (req,res,next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;




  User.findById(req.userData.userId).populate({path: 'posts', populate: { path: 'comments '}}).populate("friends")
  .then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'fetching successfull',
      posts: documents
      });
  })
  .catch(error => {
    res.status(500).json({
      message : "Fetching Posts Failed"
    });
  });
};

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

const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

exports.createComment = (req,res,next) => {
  User.findById(req.userData.userId).then(user => {
    Post.findById(req.body.postId).then( post => {
      if (!post) {
        res.status(404).json({
          message : 'post not found'
        });
      } else {
        const comment = new Comment({
          text: req.body.comment,
          creator: {
            id: req.userData.userId,
            username: user.name
          }
        });
        comment.save().then(createdComment => {
              post.comments.push(createdComment);
              post.save().then(result => {
                res.status(201).json({
                  message: 'comment created successfully',
                  comment: createdComment
                });
        }).catch(err => {
          res.status(500).json({
            message: 'creating comment failed'
            });
          });
        });
      }
    });
  })

}

const mongoose =  require('mongoose');

const postSchema = mongoose.Schema({
  caption: { type: String, required: true},
  imagePath: { type: String, required: true},
  creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments : [
                  {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Comment"
                  }
                ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
});

module.exports = mongoose.model('Post', postSchema);



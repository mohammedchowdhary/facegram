const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var FriendsOfFriends = require('friends-of-friends')(mongoose, options);

var options = {
  personModelName:            'User',
  friendshipModelName:        'Friend_Relationships',
  friendshipCollectionName:   'foo_bar_userRelationships',
};


const userSchema = mongoose.Schema({
  email: {type: String, requires: true, unique: true},
  password: {type: String, requires: true},
  profile_pic: {type: String, requires: true, default: "http://192.168.0.107:3000/images/default_profile.png"},
	name: {type: String, requires: true, default: ""},
	description: {type: String, default: ""},
  gender: {type: String, requires: true, default: "male"},
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  likes: {type: Number, default: 0}
});


userSchema.plugin(uniqueValidator);
userSchema.plugin(FriendsOfFriends.plugin, options);

module.exports = mongoose.model('User', userSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
  username: {type:String, unique: true, required: true},
  skills: [{
    name: String,
    score: Number
  }]
},{
  timestamps: true
})

var User = mongoose.model('Users', userSchema)
module.exports = User;

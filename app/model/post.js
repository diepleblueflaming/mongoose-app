let mongoose = require('mongoose');
let postSchema = new Schema({
    '_id' : {type : Number, default : 1},
    'title' : String,
    'likes' : Array,
    'comments' : Array
}) ;
// post model
let post = mongoose.model('posts', postSchema);
module.exports = post;

let mongoose = require('mongoose');
let commentSchema = new Schema({
    '_id' : {type : Number, default : 1},
    'user_comment' : Number,
    'created' : Date,
}) ;
let comment = mongoose.model('comments', commentSchema);
module.exports = comment;

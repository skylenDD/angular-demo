var mongoose = require('mongoose');

var Schema = mongoose.Schema();

var commentSchame = new mongoose.Schema({
    author: String,
    article: String,
    createtime: Date,
    content: String
});

var Comment = mongoose.model('Comment', commentSchame);  

module.exports = Comment;


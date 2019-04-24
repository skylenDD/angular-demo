var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var articalSchema = new mongoose.Schema({
    title: String,
    attribute: [],
    author: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: 'ArtType'
    },
    read: Number,
    createtime: Date,
    content: String,
    support: Number,
    Tag: [],
    updatetime: Date
});

var Article = mongoose.model('Article', articalSchema);

module.exports = Article;
var mongoose = require('mongoose');

var artTypeSchema = new mongoose.Schema({
    typename: String,
});

var ArtType = mongoose.model('ArtType', artTypeSchema);

module.exports = ArtType;
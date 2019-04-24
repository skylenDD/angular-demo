var Article = require('../../schema/admin/Artical.js');
var formidable = require('formidable');
var ArticalType = require('../../schema/admin/arcType.js');

module.exports = {
    findArticle: function(params, callback) {
        Article.find(params || {}).populate('type').exec(function(err, art) {
            callback(err, art);
        });
    },
    addForm: function(req, callback) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (fields.title != '' && fields.author != '' && fields.type != '' && fields.tags != '' && fields.content != '') {
                fields.updatetime = fields.createtime = new Date();
                Article.create(fields, function() {
                    callback(err);
                });
            } else {
                callback(-1);
            }
        });
    },
    updateArticle: function(params, callback) {
        Article.findOne(params, function(err, art) {
            if (err) {
                console.log(err);
                return;
            }
            ArticalType.find({}, function(err, result) {
                callback(err, {art: art, artType: result});
            });
        });
    },
    editForm: function(req, callback) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (fields.title != '' && fields.author != '' && fields.type != '' && fields.tags != '' && fields.content != '') {
                fields.updatetime = fields.createtime = new Date();
                Article.update(fields, function() {
                    callback(err);
                });
            } else {
                callback(-1);
            }
        });
    },
    delArticle: function(params, callback) {
        Article.remove(params, function(err) {
            callback(err);
        });
    }
}
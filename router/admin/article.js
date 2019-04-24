var express = require('express');

var router = express.Router();
var Article = require('../../schema/admin/Artical.js');
var ArticalType = require('../../schema/admin/arcType.js');

var util = require('util');
var formidable = require('formidable');

var artModel = require('../../models/admin/article.js'); // 文章业务模块

var artTypeModel = require('../../models/admin/articleType.js'); // 分类业务模块

router.get('/articelList', function(req, res, next) {
    artModel.findArticle({title: "第一篇"}, function(err, result) {
		res.render('admin/articelList', {art: result});
    })
});

router.get('/addArtical', function(req, res, next) {
    artTypeModel.findType(function(err, result) {
		res.render('admin/addArtical', {type: result});
    })
});

router.post('/addArtical', function(req, res, next) {

    artModel.addForm(req, function(err) {
        if (err == '-1') {
            res.send('资料没有填完呢');
            return;
        } else if (err) {
            console.log(err);
        }
        res.redirect('/admin/articelList');
    });
});

router.get('/editArticle', function(req, res, next) {
    var aid = req.query['_id'];
    artModel.updateArticle({'_id': aid}, function(err, art) {
        console.log(art);
        res.render('admin/updateArticle', art);
    });
});

router.get('/delArticle', function(req, res, next) {
    var aid = req.query['_id'];
    artModel.updateArticle({'_id': aid}, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        res.send('删除成功');
    });
});

router.post('/editArticle', function(req, res, next) {
    artModel.editForm(req, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        res.send('修改成功');
    });
});

module.exports = router;

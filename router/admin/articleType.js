var express = require('express');

var router = express.Router();
var ArticalType = require('../../schema/admin/arcType.js');

var artTypeModel = require('../../models/admin/articleType.js');


router.get('/type', function(req, res, next) {
    artTypeModel.findType({}, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.render('admin/artTypeList', {artType: result});
    });
});


router.get('/addType', function(req, res, next) {
	ArticalType.create(req.query, function(){
		res.send('插入成功');
	});
});

module.exports = router;

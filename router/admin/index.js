/*
	后台管理路由
*/

var express = require('express');

var router = express.Router();


var userModel = require('../../models/user/user.js');
var articleRouter = require('./article.js');
var articleType = require('./articleType.js');

router.use('/', function(req, res, next) {
	if (!req.session.userInfos) {
		res.redirect('/login');
	}
	userModel.isAdmin(req.session.userInfos.name, function(err, result) {
		if (err) {
			console.log(err);
			return;
		}
		if (result) {
			next(); // 是管理员的话继续往下走
		} else {
			res.redirect('/');
		}
	});
});

router.get('/', function(req, res, next) {
	res.render('admin/index', {});
});

router.use(articleRouter); // 引入文章模块路由
router.use(articleType); // 引入文章类型模块路由


module.exports = router;
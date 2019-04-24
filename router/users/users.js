/* 文章模块*/

var express = require('express');

var router = express.Router();

var util = require('util');

var userModel = require('../../models/user/user.js');


router.get('/reg', function(req, res, next) {
	res.render('users/register');
});

router.post('/reg', function(req, res, next) {
	console.log('Reg loading');
	var request = req;
	userModel.userFind(req, function(err, result, fields) {
		if (err) {
			console.log(err);
			return;
		}
		console.log("长度:" + result.length);
		if (result.length == 0) {
			userModel.register(fields, function(err) {
				if (err) {
					console.log(err);
					return;
				}
				res.send("注册成功");
			})
		} else {
			res.send("用户已注册");
		}
	} );
});

router.get('/login', function(req, res, next) {
	res.render('users/login');
});

router.post('/login', function(req, res, next) {
	console.log('logining...', req.body);
	userModel.queryUserInfo(req, function(findInfo) {
		console.log('login2...');
		if (findInfo == 0) {
			res.send('用户名和密码必须填写');
		} else if (findInfo == 1) {
			res.send(1);
		} else if (findInfo == 'admin') {
			res.redirect('/admin');
		} else if (findInfo == 'member') {
			res.redirect('/');
		} else if (findInfo == 2) {
			res.send('用户名和密码错误');
		}
	});
});


module.exports = router;
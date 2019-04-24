var express = require('express');

var router = express.Router();

var formidable = require('formidable');

var Users = require('../../schema/user/User.js');
var crypto = require("crypto");


module.exports = {
	register: function(fields, callback) {
		if (fields.username != '' && fields.password != '') {
			var md5 = crypto.createHash('md5');
			fields.password = md5.update(fields.password).digest('base64');
			fields.regtime = fields.updatetime = new Date();
			fields.rank = 1; // 定义用户等级
			console.log('formidable...');
			console.log(fields);
			Users.create(fields, function(err) {
				callback(err);
			});
		} else {
			callback('-1');
		}
	},

	// 判断用户是否存在
	userFind: function(req, callback) {
		// var form = new formidable.IncomingForm();
		console.log(11);
		var params = req.body;
			console.log(params);
			if (params.usename != '' && params.password != '') {
				console.log(12);
				Users.find({username: params.username}, function(err, result){
					callback(err, result, params)
				});
			} else {
				 callback(-1);
			}
	},

	queryUserInfo: function(req, callback) {
		if (req.body.username == '' || req.body.password == '') {
			callback(0); // 用户名或者密码有一项没有填写
			return;
		}
		Users.findOne({username: req.body.username}, function(err, result) {
			if (err) {
				conosle.log(err);
				return;
			}
			console.log('----');
			console.log(req.body);
			var md5 = crypto.createHash('md5');
			req.body.password = md5.update(req.body.password).digest('base64');
			console.log(result,result.username == req.body.username, result.password, req.body.password);
			if (result == null) {
				callback(1); // 没有注册
			} else if (result.username == req.body.username && result.password == req.body.password) {
				req.session.userInfos = {name: result.username, sign: true};
				if (result.rank > 10) {
					callback('admin');
				} else {
					callback('member');
				}
			} else {
				callback(2);
			}

		});
	},
	isAdmin: function(username, callback) {
		Users.findOne({username: username}, function(err, result) {
			if (result.rank > 10) {
				callback(err, true);
			} else {
				 callback(err, false);
			}
		});
	}
};
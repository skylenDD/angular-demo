var express = require("express");

var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var db = require('./config/db.js');

var session = require('express-session');
app.use(session({
	secret: 'jia mi de ming zi',
	resave: false,
	cookie: {maxAge: 60*30*1000}
}));

// 后台模块
app.use("/admin", require('./router/admin'));

// 登陆注册模块
app.use(require('./router/users/users.js'));


// 会员（普通用户）
app.use("/member", function(req, res) {
	res.send('Hello member');
});

app.use(require('./router/frontend/index.js'));


app.listen(3000);
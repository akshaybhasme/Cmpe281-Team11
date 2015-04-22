var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:akshay@ds041871.mongolab.com:41871/cmpe281');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('This is the users API');
});

var sess;

router.get('/isLoggedIn', function(req, res){
	sess = req.session;
	if(sess.email){
		res.send({loggedIn: true});
	}else{
		res.send({loggedIn: false});
	}
});

router.post('/login', function(req, res){
	sess = req.session;
	console.log(req);
	sess.email = req.body.email;
});

router.post('/register', function(req, res){
	sess = req.session;
});

module.exports = router;

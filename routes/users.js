var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');

mongoose.connect('mongodb://admin:akshay@ds041871.mongolab.com:41871/cmpe281');

var User = mongoose.model('users', {name : String, email : String, pwHash : String});

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('This is the users API');
});

var sess;

router.get('/isLoggedIn', function(req, res){
	sess = req.session;
	if(sess.email){
		User.findOne({ email: sess.email}, function(err, user){
			res.send(user);
		});
	}else{
		res.send({error: "Not logged in"});
	}
});

router.post('/login', function(req, res){
	sess = req.session;
	
	var pwHashS = crypto.createHash('md5').update(req.body.password).digest('hex');
	
	User.findOne({ email: req.body.email, pwHash : pwHashS}, function(err, user){
		if(user){
			sess.email = user.email;
			res.send(user);
		}else{
			res.send({error : "Credentials did not match any of our records"});
		}
	});
});

router.post('/register', function(req, res){
	sess = req.session;
	
	var pwHashS = crypto.createHash('md5').update(req.body.password).digest('hex');
	
	//Find if user already exists with same email and password
	User.findOne({ email: req.body.email}, function(err, user){
		if(user){
			if(user.pwHash === pwHashS){
				sess.email = user.email;
				res.send(user);
			}else{
				res.send({error : "User with email already exists"});
			}
		}else{
			//Save user
			var u = new User({email: req.body.email, pwHash: pwHashS, name : req.body.name});
			u.save(function(err){
				if(err) {throw err;}
				sess.email = u.email;
				res.send(u);
			});
		}
	});
	
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var sess;

var Project = mongoose.model('projects', {type: String, object : {}, users: []});
var Task = mongoose.model('tasks', {type: String, object : {}, users: [], projects: []});

/* GET users listing. */						
router.get('/', function(req, res) {
  res.send('This is the apps API');
});

router.get('/getProjects/:type', function(req, res){
	
	sess = req.session;
	
	if(!sess.email){
		res.send({error : "401 Unauthorized"});
		return;
	}
	
	var type = req.params.type;
	
	Project.find({type: type, users: sess.user_id}, function(err, projects){
		res.send(projects);
	});
	
});

router.post('/addProject/:type', function(req, res){
	
	sess = req.session;
	
	if(!sess.email){
		res.send({error : "401 Unauthorized"});
		return;
	}
	
	var type = req.params.type;
	
	var project = new Project({type: type, object: req.body.object, users: [sess.user_id]});
	
	project.save(function(err){
		if(err) {throw err;}
		res.send(project);
	});
	
});

router.delete('/deleteProject/:projectID', function(req, res){

	sess = req.session;
	
	if(!sess.email){
		res.send({error : "401 Unauthorized"});
		return;
	}
	
	var projectID = req.param.projectID;
	
	Project.remove({_id : projectID}, function(err){
		if(err) {throw err;}
		
		res.send({status: "Done"});
	});
	
});

router.put('/updateProject/:projectID', function(req, res){
	
	sess = req.session;
	
	if(!sess.email){
		res.send({error : "401 Unauthorized"});
		return;
	}
	
	var projectID = req.param.projectID;
	
	Project.update({_id : projectID}, {object : req.body.object}, {multi : false}, function(err, project){
		res.send(project);
	});
	
});

router.get('/getTasks/:type/:projectID', function(req, res){
	
	sess = req.session;
	
	if(!sess.email){
		res.send({error : "401 Unauthorized"});
		return;
	}
	
	var type = req.params.type;
	var projectID = req.params.projectID;
	
	Task.find({type: type, users: sess.user_id, projects: projectID}, function(err, tasks){
		if(err) {throw err;}
		res.send(tasks);
	});
	
});

router.post('/addTask/:type/:projectID', function(req, res){
	
	sess = req.session;
	
	if(!sess.email){								// User is not logged in
		res.send({error : "401 Unauthorized"});
		return;
	}
	
	var type = req.params.type; 									//defining project type and ID
	var projectID = req.params.projectID;
	
	var task = new Task({type: type, object: req.body.object, users: [sess.user_id], projects: [projectID]});  // task is created
	
	task.save(function(err){
		if(err) {throw err;}
		res.send(task);
	});
	
});

router.delete('/deleteTask/:taskID', function(req, res){				//for deleting the task

	sess = req.session;
	
	if(!sess.email){
		res.send({error : "401 Unauthorized"});
		return;
	}
	
	var taskID = req.param.taskID;
	
	Task.remove({_id : taskID}, function(err){
		if(err) {throw err;}
		
		res.send({status: "Done"});
	});
	
});

router.put('/updateTask/:taskID', function(req, res){
	
	sess = req.session;
	
	if(!sess.email){
		res.send({error : "401 Unauthorized"});
		return;
	}
	
	var taskID = req.param.taskID;
	
	Task.update({_id : taskID}, {object : req.body.object}, {multi : false}, function(err, task){
		res.send(task);
	});
	
});

module.exports = router;
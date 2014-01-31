'use strict';

require('../models/Session');

module.exports.setup = function(app, mongoose){

	/*
	 * Session routes
	 */
	var Session = mongoose.model('session');
	var baseUrl = '/session';

	//list all sessions
	app.get(baseUrl,function(req,res){
		Session.getAll(function(err,sessions){
			if(err){throw err;}
			res.send(sessions);
		});
	});

	//get single session
	app.get(baseUrl +'/:id',function(req,res){
		Session.findOne({_id:req.params.id},function(err,session){
			if(err){

				/*
				*	check for castErrors, means that mongoose cannot parse the passed 
				*	ID.	
				*/
				if(err.name === 'CastError'){
					res.send('session not found');
				}
				else{throw err;}

			}else{//if no errors pass back the session
				if(session !== null){
					res.send(session);
				}else{
					res.send('session not found');
				}
			}
		});
	});

	//add a poll to a session
	app.post(baseUrl + '/:id/poll/:pollid',function(req,res){
		Session.findOne({_id:req.params.id},function(err,session){
			if(err){
				/*
				*	check for castErrors, means that mongoose cannot parse the passed 
				*	ID.	
				*/
				if(err.name === 'CastError'){
					res.send('session not found');
				}
				else{throw err;}

			}else{//if no error attach a poll to the session
				if(session !== null){
					session.addPoll(function(err){
						if(err){throw err;}
						res.send('poll added');
					});
				}else{
					res.send('session not found');
				}
			}
		});
	});

	 //create a new session
	app.post(baseUrl,function(req,res){
		//validate the data before inserting it into the db

		//taken from https://github.com/mongodb/js-bson/blob/master/lib/bson/objectid.js
		var objectIDRegex = new RegExp('^[0-9a-fA-F]{24}$');
		var pass = true;
		var tempSession;

		pass = objectIDRegex.test(req.body.creator);
		pass = typeof(req.body.tags !== 'Array');

		if(req.body.poll)
		{
			pass = objectIDRegex.test(req.body.poll);
			if(pass)//handle case where session may be created with a poll attached
			{
				tempSession = new Session({
					name: req.body.name,
					tags: req.body.tags,
					open: req.body.open,
					creator: mongoose.Types.objectid(req.body.creator),
					poll: mongoose.Types.objectid(req.body.poll)
				});
				
				tempSession.save(function(err){
					if(err){throw err;}
					res.send('session created');
				});
			}
		}

		if(pass && !req.body.poll)
		{
			tempSession = new Session({
				name: req.body.name,
				tags: req.body.tags,
				open: req.body.open,
				creator: mongoose.Types.ObjectId(req.body.creator),
				poll: null
			});

			tempSession.save(function(err){
				if(err){throw err;}
				res.send('session created');
			});
		}
	});

	app.put(baseUrl+'/:id/open/',function(req,res){
		Session.setOpen(req.params.id, function(err){
			if(err){throw err;}
			res.send('session opened');
		});
	});

	app.put(baseUrl+'/:id/close/',function(req,res){
		Session.setClosed(req.params.id, function(err){
			if(err){throw err;}
			res.send('session closed');
		});
	});

	app.delete(baseUrl+'/:id/', function(req,res){
		Session.delete(req.params.id, function(err){
			if(err){throw err;}
			res.send('session deleted');
		});
	});
};
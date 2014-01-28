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

	 //create a new session
	app.post(baseUrl,function(req,res){
		res.send('hello');
	});
};
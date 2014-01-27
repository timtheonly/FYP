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

	//get 
	app.get(baseUrl +'/:id',function(req,res){
		Session.findOne({_id:req.params.id},function(err,session){
			
			if(err){throw err;}

			if(session !== null){
				res.send(session);
			}else{
				res.send('session not found');
			}
		});
	});

	 //create a new session
	app.post(baseUrl,function(req,res){
		res.send('hello');
	});
};
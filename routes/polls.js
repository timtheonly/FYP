'use strict';

require('../models/Poll');

module.exports.setup = function(app, mongoose){

	/*
	 * Session routes
	 */
	var Poll = mongoose.model('poll');
	var baseUrl = '/poll';

	//list all polls
	app.get(baseUrl, function(req,res){
		Poll.listAll(function(err,polls){
			if(err){throw err;}
			res.send(polls);
		});
	});

	//list all global polls
	app.get(baseUrl+'/globals',function(req,res){
		Poll.listAllGlobals(function(err,polls){
			if(err){throw err;}
			res.send(polls);
		});
	});

	//open a poll
	app.put(baseUrl+'/:id/open/',function(req,res){
		Poll.setOpen(req.params.id, function(err){
			if(err){throw err;}
			res.send('poll opened');
		});
	});

	//close a poll
	app.put(baseUrl+'/:id/close/',function(req,res){
		Poll.setClosed(req.params.id, function(err){
			if(err){throw err;}
			res.send('poll closed');
		});
	});


	//delete a poll
	app.delete(baseUrl+'/:id/',function(req,res){
		Poll.delete(req.params.id,function(err){
			if(err){throw err;}
			res.send('poll deleted');
		});
	});
};
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
};
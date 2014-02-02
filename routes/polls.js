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

	//create a new poll
	app.post(baseUrl,function(req,res){

		//taken from https://github.com/mongodb/js-bson/blob/master/lib/bson/objectid.js
		var objectIDRegex = new RegExp('^[0-9a-fA-F]{24}$');
		var pass = true;
		var tempPoll;

		pass = objectIDRegex.test(req.body.creator);
		pass = typeof(req.body.answers !== 'Array');

		if(req.body.session)
		{
			pass = objectIDRegex.test(req.body.session);
			if(pass)//handle case where poll may be created within a session
			{
				tempPoll = new Poll({
					question: req.body.question,
					session: mongoose.Types.ObjectId(req.body.session),
					answers: req.body.answers,
					creator: mongoose.Types.ObjectId(req.body.creator),
					open: req.body.open
				});

				tempPoll.save(function(err){
					if(err){throw err;}
					res.send('poll created');
				});
			}
		}

		if(pass && !req.body.session)//handle case where poll may be created globally
		{
			tempPoll = new Poll({
				question: req.body.question,
				answers: req.body.answers,
				creator: mongoose.Types.ObjectId(req.body.creator),
				open: req.body.open,
				session: null
			});

			tempPoll.save(function(err){
				if(err){throw err;}
				res.send('poll created');
			});
		}
	});
};
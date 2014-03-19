'use strict';

require('../models/Session');
require('../models/Poll');

module.exports.setup = function(app, mongoose, io){

	/*
	 * Session routes
	 */
	var Session = mongoose.model('session');
    var Poll = mongoose.model('poll');

	var baseUrl = '/session';
    var sockets = io.sockets;

    sockets.on('connection',function(socket){
        socket.on('poll-remove',function(data){
            Session.findOne({_id:data.session},function(err,session){
               if(err){throw err;}
               session.poll = null;
               session.save(function(err){
                   if(err){throw err;}
                   Poll.delete(data.poll,function(err){
                       socket.broadcast.to(session._id).emit('pollUpdate',null);
                   });
               });
            });
        });

        socket.on('new-poll',function(id){
            Poll.findOne({_id:id},function(err,poll){
                if(err){throw err;}
                socket.broadcast.to(poll.session).emit('pollUpdate',poll);
            });
        });
    });

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
	app.put(baseUrl + '/:id/poll/:pollid',function(req,res){
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
					session.addPoll(req.params.pollid,function(err){
                        Poll.findOne({_id:req.params.pollid},function(err,poll){
                            poll.session = req.params.id;
                            poll.save(function(err){
                                if(err){throw err;}
                                res.send('poll added');
                            });
                        });
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
		var pass;
		var tempSession;

		pass = objectIDRegex.test(req.body.creator);
		pass = typeof(req.body.tags !== 'Array');

		if(req.body.poll)//handle sesssions with polls differently
		{
			pass = objectIDRegex.test(req.body.poll);
			if(pass)//handle case where session may be created with a poll attached
			{
				tempSession = new Session({
					name: req.body.name,
					tags: req.body.tags,
					open: req.body.open,
					creator: mongoose.Types.Objectid(req.body.creator),
					poll: mongoose.Types.Objectid(req.body.poll)
				});
				
				tempSession.save(function(err){
					if(err){throw err;}
					res.send(tempSession._id);
				});
			}
		}

		if(pass && !req.body.poll)//handle sessions that done have a poll
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
				res.send(tempSession._id);
			});
		}
	});

    //add a password to a session
    app.put(baseUrl+'/:id/setpassword/:pw',function(req,res){
        Session.setPassword(req.params.id,req.params.pw,function(err){
            if(err){throw err;}
            res.send('password set');
        });
    });

    //remove a password from a session
    app.put(baseUrl+'/:id/removepassword',function(req,res){
        Session.setPassword(req.params.id,req.body.password,function(err){
            if(err){throw err;}
            res.send('password removed');
        });
    });

	//open a session
	app.put(baseUrl+'/:id/open/',function(req,res){
		Session.setOpen(req.params.id, function(err){
			if(err){throw err;}
			res.send('session opened');
		});
	});

	//close a session
	app.put(baseUrl+'/:id/close/',function(req,res){
		Session.setClosed(req.params.id, function(err){
			if(err){throw err;}
			res.send('session closed');
		});
	});

	//delete a session
	app.delete(baseUrl+'/:id', function(req,res){
		Session.delete(req.params.id, function(err){
			if(err){throw err;}
			res.send('session deleted');
		});
	});
};
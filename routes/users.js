'use strict';

require('../models/User');

module.exports.setup = function(app, mongoose){
	/*
	* User routes
	*/
	var User = mongoose.model('User');
	var baseUrl = '/users';
	app.post(baseUrl+'/login', function(req,res){
		User.authenicate(req.body.username, req.body.password, function(err, data){
				if(err)
				{
					if(err === 1)
					{
						res.send('username doesn\'t exist');
					}else if(err === 2){
						res.send('incorrect password');
					}else{
						return err;
					}
					
				}else
				{
					var tempUser = {name:data.name,
						email:data.email,
						username:data.username
					};
					req.session.user = tempUser;
					res.send('ok');
				}
				
			});
	});


	app.get(baseUrl+'/logout',function(req,res){
		if(req.session.user)
		{
			req.session.user = null;
		}
		res.redirect('/');
	});

	app.post(baseUrl, function(req,res){
		var user = new User({
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password:req.body.password
		});
		
		user.save(function(err){
			if(err){
				res.send('user exsits');
				return console.log(err);
			}else{
				res.send('ok');
			}
		});
		
	});
};
'use strict';

require('../models/User');

module.exports.setup = function(app, mongoose){
	/*
	 * User routes
	 */
	var User = mongoose.model('User');
	var baseUrl = '/users';

	//authenicate the user
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
					var tempUser = {

						name: data.name,
						email: data.email,
						username: data.username,
						_id: data._id,
						elevated: data.elevated
					};
					req.session.user = tempUser;
					res.send('ok');
				}
				
			});
	});

	//send back the users data
	app.get('/user', function(req,res){
		if(req.session.user)
		{
			res.send(req.session.user);
		}
	});

    //list all users
    app.get(baseUrl, function(req,res){
        User.list(function(data){
            res.send(data);
        });
    });

	//logout the user
	app.get(baseUrl+'/logout',function(req,res){
		if(req.session.user)
		{
			req.session.user = null;
		}
		res.redirect('/');
	});

    //elevate the user
    app.put(baseUrl+'/elevate/:id',function(req, res){
        User.elevate(req.params.id,function(err){
            if(err){throw err;}
            res.send('elevated');
        });
    });

    //update the users password
    app.put(baseUrl+'/password', function(req,res){
        User.authenicate(req.body.username,req.body.password,function(err, user){
            if(err)
            {
                if(err === 1)
                {
                    res.send('username doesn\'t exist');
                }else if(err === 2){
                    res.send('incorrect password supplied');
                }else{
                    return err;
                }

            }else
            {
                if(req.body.newPassword.length > 0)
                {
                    user.password = req.body.newPassword;
                    user.save(function(err){
                        if(err){throw err;}
                        res.send('ok')
                    });
                }else{
                    res.send('password can\'t be blank');
                }
            }
        });
    });

	//create a new user
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

    //delete a user
    app.delete(baseUrl+'/:username',function(req,res){
        User.delete(req.params.username,function(err){
            if(err){
                res.send('opps there was a problem');
                return console.log(err);
            }else{
                res.send('ok');
            }

        });
    });
};
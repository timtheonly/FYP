'use strict';
var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
require('../../models/User');
var User = mongoose.model('User');
var user;

before(function(done){
	mongoose.connect('mongodb://localhost/FYP-test',done);
});

beforeEach(function(done){
    user = new User({
        name:'daniel',
        username:'daniel',
        password:'hello',
        elevated: false,
        email:'blah@blah.com'
    });
    user.save(function(err){
        if(err) {throw err;}
        done();
    });
});

afterEach(function(done){
	User.remove({$or:[{username:'daniel'},{username:'daniel1'}]},function(err){
		if(err) {throw err;}
		done();
	});
});

after(function(done){
	mongoose.disconnect(done);
});

describe('#class User', function(){


	it('should allow a model to be saved', function(done){
		var user = new User({
			name:'daniel1',
			username:'daniel1',
			password:'hello',
			elevated: true,
			email:'blah@blah.com'
		});
		user.save(function(err){
			if(err) {throw err;}
			done();
		});
	});

    it('should list all system users', function(done){
        User.list(function(users){
            expect(users).to.be.an.Array;
            done();
        });
    });

    it('should elevate a user', function(done){
        User.elevate(user._id,function(err,elevatedUser){
            user = elevatedUser;
            expect(user.elevated).to.be.true;
            done();
        });
    });

	it('should authenicate a user with correct password', function(done){
			User.authenicate('daniel', 'hello', function(err, authUser){
				if(err) {throw err;}
				expect(authUser).to.not.be.null;
				done();
			});
	});

	it('should not authenicate a user with incorrect password', function(done){
        User.authenicate('daniel', 'helo', function(err, authUser){
            expect(err).to.equal(2);
            expect(authUser).to.be.null;
            done();
        });
	});


	it('should not authenicate a non existant user',function(done){
		User.authenicate('daiel', 'hello', function(err, authUser){
				expect(err).to.equal(1);
				expect(authUser).to.be.null;
				done();
		});
	});
});


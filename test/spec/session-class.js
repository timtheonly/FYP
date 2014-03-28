'use strict';
var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
require('../../models/Session');
var Session = mongoose.model('session');
var mySession;

beforeEach(function(done){

	mySession = new Session({
		name:'my session',
		tags:['super','awesome', 'session'],
		creator: new mongoose.Types.ObjectId,
		open:true,
		poll:null
	});

	mySession.save(done);
});

afterEach(function(done){
//	console.log(mySession);
	Session.remove({name:'my session'},done);
});

describe('#class Session', function(){
	
	it('should allow a model to be saved',function(done){
		var tempSession = new Session({
			name:'my session',
			tags:['super','awesome', 'session'],
			creator: new mongoose.Types.ObjectId,
			open:true
		});

		tempSession.save(done);
	});
	

	
	it('should allow all sessions to be listed',function(done){
		Session.getAll(function(err,sessions){
			if(err){done(err);}
			expect(sessions.length).to.equal(1);
			done();
		});
	});

	it('should allow a poll to be added',function(done){
		var pollId = new mongoose.Types.ObjectId;
		mySession.addPoll(pollId,function(err){
			if(err){done(err);}
			expect(mySession.poll).to.equal(pollId);
			done();
		});
	});

	it('should allow a session to be opened by id',function(done){
		Session.setOpen(mySession._id, function(err,session){
			if(err){done(err);}
			mySession = session;
			expect(mySession.open).to.be.true;
			done();
		});
	});

	it('should allow a session to be closed by id',function(done){
        Session.setClosed(mySession._id, function(err,session){
            if(err){done(err);}
            mySession = session;
            expect(mySession.open).to.be.false;
            done();
		});
	});

    it('should allow a password to be set on a session', function(done){
        Session.setPassword(mySession._id,'apples',function(err,newSession){
            if(err){done(err);}
            mySession = newSession;
            expect(mySession.password).to.equal('apples');
            done();
        });
    });

    it('should allow a password to be removed from a session', function(done){
        Session.setPassword(mySession._id,'apples',function(err,newSession){
            if(err){done(err);}
            mySession = newSession;
            expect(mySession.password).to.equal('apples');
            Session.removePassword(mySession._id,function(err,newSession){
                mySession = newSession;
                expect(mySession.password).to.be.null;
                done();
            });
        });
    });

});
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
	

	it('should allow tag to be added',function(done){
		mySession.addTag('bad ass',function(err){
			if(err){done(err);}
			expect(mySession.tags.length).to.equal(4);
			expect(mySession.tags.toString()).to.equal(['super','awesome', 'session', 'bad ass'].toString());
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

	it('should allow a session to be opened by id');
	it('should allow a session to be closed by id');

});
'use strict';
var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
require('../../models/Poll');
var Poll = mongoose.model('poll');
var myPoll;
var ID;

beforeEach(function(done){
	myPoll = new Poll({
			question: 'who am i',
			session: new mongoose.Types.ObjectId,
			answers: ['you', 'me', 'us', 'them'],
			creator: new mongoose.Types.ObjectId,
			open: false,
		});
	ID = myPoll._id;

	myPoll.save(function(err){
			if(err) {throw err;}
		});

	myPoll = new Poll({
			question: 'who am i',
			answers: ['you', 'me', 'us', 'them'],
			creator: new mongoose.Types.ObjectId,
			open: false,
	});

	myPoll.save(function(err){
			if(err) {throw err;}
			done();
		});
});

afterEach(function(done){
	Poll.remove({question:'who am i'},function(err){
		if(err) {throw err;}
		done();
	});
});

describe('#class Poll', function(){
	it('should allow a model to be saved', function(done){
		var maPoll = new Poll({
			question: 'who am i',
			session: new mongoose.Types.ObjectId,
			answers: ['you', 'me', 'us', 'them'],
			creator: new mongoose.Types.ObjectId,
			open: true,
		});

		maPoll.save(function(err){
			if(err) {throw err;}
			done();
		});
	});

	it('should list all global polls',function(done){
		Poll.listAllGlobals(function(err,data){
			expect(data.length).to.equal(1);
			done();
		});
	});

	it('should allow a poll to be opened',function(done){
		expect(myPoll.open).to.be.false;
		myPoll.open = true;
		myPoll.save(function(err){
			if(err){done(err);}
			expect(myPoll.open).to.be.true;
			done();
		});

	});

	it('should allow a poll to be opened by ID',function(done){
		Poll.setOpen(ID,function(err,numAffected){
			if(err){done(err);}
			expect(numAffected).to.equal(1);
			done();
		});
	});

	it('should allow a poll to be closed by ID',function(done){
		Poll.setClosed(ID,function(err,numAffected){
			if(err){done(err);}
			expect(numAffected).to.equal(1);
			done();
		});
	});

	it('should allow the addition of an answer',function(done){
		console.log(myPoll.answers);
		myPoll.addAnswer('whom',function(err){
			if(err){done(err);}
			console.log(['you', 'me', 'us', 'them','whom']);
			console.log(myPoll.answers);
			expect(myPoll.answers).to.equal(['you', 'me', 'us', 'them','whom']);
			done();
		});
	});
});


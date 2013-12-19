'use strict';
var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
require('../../models/Poll');
var Poll = mongoose.model('poll');
var myPoll;

beforeEach(function(done){
	myPoll = new Poll({
			question: 'who am i',
			session: new mongoose.Types.ObjectId,
			answers: ['you', 'me', 'us', 'them'],
			creator: new mongoose.Types.ObjectId,
			open: true,
		});

	myPoll.save(function(err){
			if(err) {throw err;}
		});

	myPoll = new Poll({
			question: 'who am i',
			answers: ['you', 'me', 'us', 'them'],
			creator: new mongoose.Types.ObjectId,
			open: true,
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
});


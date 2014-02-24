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
			answers: [{'answer':'you', 'response':0}, {'answer':'me', 'response':0}, {'answer':'us', 'response':0}, {'answer':'them', 'response':0}],
			creator: new mongoose.Types.ObjectId,
			open: false,
		});
	ID = myPoll._id;

	myPoll.save(function(err){
			if(err) {throw err;}
		});

	myPoll = new Poll({
			question: 'who am i',
			answers: [{'answer':'you', 'response':0}, {'answer':'me', 'response':0}, {'answer':'us', 'response':0}, {'answer':'them', 'response':0}],
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
			answers:[{'answer':'you', 'response':0}, {'answer':'me', 'response':0}, {'answer':'us', 'response':0}, {'answer':'them', 'response':0}],
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
		Poll.setOpen(ID,function(err,poll){
			if(err){done(err);}
			myPoll = poll;
			expect(myPoll.open).to.be.true;
			done();
		});
	});

	it('should allow a poll to be closed by ID',function(done){
		Poll.setClosed(ID,function(err,poll){
			if(err){done(err);}
			myPoll = poll;
			expect(myPoll.open).to.be.false;
			done();
		});
	});

	it('should allow the addition of an answer',function(done){
		Poll.addAnswer('whom',ID,function(err, poll){
			if(err){done(err);}
			myPoll = poll;
			expect(myPoll.answers.length).to.equal(5);
			done();
		});
	});

    it('should allow the submission of a response', function(done){
        Poll.input(ID, 'me', function(err,poll){
            if(err){done(err);}
            myPoll = poll
            expect(myPoll.answers[1].response).to.equal(1);
            done();
        });
    });
});


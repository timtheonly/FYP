'use strict';
var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
require('../../models/Poll');
var Poll = mongoose.model('poll');

before(function(done){
	mongoose.connect('mongodb://localhost/FYP',done);
});

after(function(done){
	mongoose.disconnect(done);
});

describe('#class Poll', function(){
	it('should allow a model to be saved', function(done){
		var myPoll = new Poll({
			question: 'who am i',
			session: new mongoose.Types.ObjectId,
			answers: ['you', 'me', 'us', 'them'],
			creator: new mongoose.Types.ObjectId,
			open: true,
		});

		myPoll.save(function(err){
			if(err) {throw err;}
			done();
		});
	});
});
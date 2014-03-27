'use strict';

var chai = require('chai');
var expect = chai.expect;
var http = require('superagent');
var pollID;


describe('#routes test /poll', function(){
	beforeEach(function(done){
		http.post('http://localhost:9000/poll')
		.send({
			creator:'52e6d0174d61ba401d00004b',
			question:'isn\'t javascript cool',
			answers:[{answer:'yeah', response:0},{answer:'hells yeah', response:0},{answer:'nope', response:0}],
			open:true
		})
		.end(function(res){
			pollID = res.body;
			done();
		});
	});

	afterEach(function(done){
		http.del('http://localhost:9000/poll/' +pollID+'/')
		.end(function(){
			done();
		});
	});


	it('should list all polls', function(done){
		http.get('http://localhost:9000/poll')
		.end(function(res){
			expect(res.body).to.be.an('Array');
			done();
		});
	});

	it('should display a single poll',function(done){
		http.get('http://localhost:9000/poll/'+pollID+'/')
		.end(function(res){
			expect(res.body.question).to.equal('isn\'t javascript cool');
			done();
		});
	});


	it('should list all global polls', function(done){
		http.get('http://localhost:9000/poll/globals')
		.end(function(res){
			expect(res.body).to.be.an('Array');
			done();
		});
	});

	it('should create a poll', function(done){
		var tempPollId;
		http.post('http://localhost:9000/poll/')
		.send({
			creator:'52e6d0174d61ba401d00004b',
			question:'isn\'t javascript cool',
			answers:[{answer:'yeah', response:0},{answer:'hells yeah', response:0},{answer:'nope', response:0}],
			open:true
		}).end(function(res){
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			tempPollId = res.body;
			http.del('http://localhost:9000/poll/' +tempPollId+'/')
			.end(function(){
                done();
			});
		});
	});

	it('should delete a poll',function(done){
		var tempPollId;
		http.post('http://localhost:9000/poll')
		.send({
			creator:'52e6d0174d61ba401d00004b',
			question:'isn\'t javascript cool',
			answers:[{answer:'yeah', response:0},{answer:'hells yeah', response:0},{answer:'nope', response:0}],
			open:true
		}).end(function(res){
			tempPollId = res.body;
			http.del('http://localhost:9000/poll/' +tempPollId+'/')
			.end(function(res2){
				expect(res2).to.exist;
				expect(res2.status).to.equal(200);
				expect(res2.text).to.equal('poll deleted');
				done();
			});
		});
	});
});
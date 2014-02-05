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
			answers:['yeah','hells yeah','nope'],
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

	it('should list all global polls', function(done){
		http.get('http://localhost:9000/poll/globals')
		.end(function(res){
			expect(res.body).to.be.an('Array');
			done();
		});
	});

	it('should create a poll', function(done){
		var tempPollId;
		http.post('http://localhost:9000/poll')
		.send({
			creator:'52e6d0174d61ba401d00004b',
			question:'isn\'t javascript cool',
			answers:['yeah','hells yeah','nope'],
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
});
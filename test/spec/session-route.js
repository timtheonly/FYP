'use strict';

var chai = require('chai');
var expect = chai.expect;
var http = require('superagent');
var sessionID;


describe('#routes test /session', function(){

	beforeEach(function(done){
		http.post('http://localhost:9000/session')
		.send({
			name: 'supper awesome poll',
			tags: ['blah','blah','blah'],
			creator:'52e6d0174d61ba401d00004b',
			open: true
		})
		.end(function(res){
			sessionID = res.body;
			done();
		});
	});

	afterEach(function(done){
		http.del('http://localhost:9000/session/'+sessionID +'/')
		.end(function(){
			done();
		});
	});

	it('should list all sessions',function(done){
		http.get('http://localhost:9000/session')
			.end(function(err,res){
				if(err){done(err);}
				expect(res.body).to.be.an('Array');
				done();
			});
	});

});
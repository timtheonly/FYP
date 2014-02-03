'use strict';

var chai = require('chai');
var expect = chai.expect;
var http = require('superagent');

describe('#routes test routes', function(){
	
	describe('/user',function(){
		it('should allow a user to be created',function(done){
			http.post('http://localhost:9000/users')
			.send({
				name: 'daniel',
				username: 'testuser',
				password: 'blah',
				email:'the@mail.com',
				elevated: true
			})
			.end(function(err,res){
				expect(res).to.exist;
				expect(res.status).to.equal(200);
				expect(res.text).to.equal('ok');
				http.del('http://localhost:9000/users/testuser',function(err2,res2){
					expect(res2).to.exist;
					expect(res2.status).to.equal(200);
					expect(res2.text).to.equal('ok');
					done();
				});
			});
		});
	});
});


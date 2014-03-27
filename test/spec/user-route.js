'use strict';

var chai = require('chai');
var expect = chai.expect;
var http = require('superagent');



describe('#routes test /user', function(){

	beforeEach(function(done){
		http.post('http://localhost:9000/users')
		.send({
			name:'daniel',
			username:'testuser',
			password:'blah',
			email:'the@mail.com',
			open: true
		}).end(function(){
			done();
		});
	});

	afterEach(function(done){
		http.del('http://localhost:9000/users/testuser').end(function(){
			done();
		});
	});

	it('should allow a user to be created',function(done){
		http.post('http://localhost:9000/users')
		.send({
			name: 'dan',
			username: 'test1',
			password: 'blah',
			email:'the@mail.com',
			elevated: true
		})
		.end(function(err,res){
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			expect(res.text).to.equal('ok');delete
			http.del('http://localhost:9000/users/test1',function(err2,res2){
				expect(res2).to.exist;
				expect(res2.status).to.equal(200);
				expect(res2.text).to.equal('ok');
				done();
			});
		});

	});

	it('should allow a user to login', function(done){
		http.post('http://localhost:9000/users/login').
		send({
			username:'testuser',
			password:'blah'
		}).end(function(err,res){
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			expect(res.text).to.equal('ok');
			done();
		});
	});

	it('should not allow a user to login with incorrect password', function(done){
		http.post('http://localhost:9000/users/login').
		send({
			username:'testuser',
			password:'eh'
		}).end(function(err,res){
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			expect(res.text).to.equal('incorrect password');
			done();
		});
	});

	it('shouldn\'t authenicate a non existant user', function(done){
		http.post('http://localhost:9000/users/login').
		send({
			username:'blah2',
			password:'blah'
		}).end(function(err,res){
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			expect(res.text).to.equal('username doesn\'t exist');
			done();
		});
	});

	it('should logout a logged in user', function(done){
		http.post('http://localhost:9000/users/login').
		send({
			username:'testuser',
			password:'blah'
		}).end(function(err,res){
			http.get('http://localhost:9000/users/logout').end(function(err, res2){
				expect(res2).to.exist;
				expect(res2.status).to.equal(200);
				done();
			});
		});
	});
});

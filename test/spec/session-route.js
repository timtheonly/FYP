'use strict';

var chai = require('chai');
var expect = chai.expect;
var http = require('superagent');
var sessionID;


describe('#routes test /session', function(){

	beforeEach(function(done){
		http.post('http://localhost:9000/session')
		.send({
			name: 'supper awesome session',
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

	it('should list a single session',function(done){
		http.get('http://localhost:9000/session/'+sessionID+'/')
			.end(function(err,res){
				if(err){done(err);}
				expect(res.body.name).to.equal('supper awesome session');
				done();
			});
	});

	it('should create a session', function(done){
		var tempSessionId;
		http.post('http://localhost:9000/session')
		.send({
			name: 'supper awesome poll',
			tags: ['blah','blah','blah'],
			creator:'52e6d0174d61ba401d00004b',
			open: true
		})
		.end(function(res){
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			tempSessionId = res.body;
			http.del('http://localhost:9000/session/'+tempSessionId +'/')
			.end(function(){
				done();
			});
		});
	});

	it('should remove a session', function(done){
		var tempSessionId;
		http.post('http://localhost:9000/session')
		.send({
			name: 'supper awesome poll',
			tags: ['blah','blah','blah'],
			creator:'52e6d0174d61ba401d00004b',
			open: true
		})
		.end(function(res){
			tempSessionId = res.body;
			http.del('http://localhost:9000/session/'+tempSessionId +'/')
			.end(function(res2){
				expect(res2).to.exist;
				expect(res2.status).to.equal(200);
				expect(res2.text).to.equal('session deleted');
				done();
			});
		});
	});

    it('should allow a session to have a password set',function(done){
       http.put('http://localhost:9000/session/'+sessionID+'/setpassword/password')
           .end(function(res){
               expect(res).to.exist;
               expect(res.status).to.equal(200);
               expect(res.text).to.equal('password set');
               done();
           });
    });

    it('should allow a password to be removed from a session',function(done){
        http.put('http://localhost:9000/session/'+sessionID+'/removepassword')
            .end(function(res){
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('password removed');
                done();
            });
    });

    it('should allow a poll to be attached',function(done){
        var pollid;
        http.post('http://localhost:9000/poll')
            .send({
                creator:'52e6d0174d61ba401d00004b',
                question:'isn\'t javascript cool',
                answers:[{answer:'yeah', response:0},{answer:'hells yeah', response:0},{answer:'nope', response:0}],
                open:true
            })
            .end(function(res){
               pollid = res.body;
               http.put('http://localhost:9000/session/'+sessionID+'/poll/'+pollid)
                   .end(function(res){
                       expect(res).to.exist;
                       expect(res.status).to.equal(200);
                       expect(res.text).to.equal('poll added');
                       done();
                   });
            });

    });
});
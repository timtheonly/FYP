'use strict';
var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
require('../../models/Session');
var Session = mongoose.model('session');
var mySession;

beforeEach(function(done){

	mySession = new Session({
		name:'my sesion',
		tags:['super','awesome', 'session'],
		creator: new mongoose.Types.ObjectId,
		open:true
	});

	mySession.save(done);
});

afterEach(function(done){
	Session.remove({name:'my session'},done);
});

describe('#class Session', function(){
	
	it('should allow a model to be saved',function(done){
		var tempSession = new Session({
			name:'my sesion',
			tags:['super','awesome', 'session'],
			creator: new mongoose.Types.ObjectId,
			open:true
		});

		tempSession.save(done);
	});
	

	it('should allow tags to be added');
	it('should allow a poll to be added');

});
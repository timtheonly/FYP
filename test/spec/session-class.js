'use strict';
var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
require('../../models/session');
var Session = mongoose.model('session');

describe('#class Session', function(){
	
	it('should allow a model to be saved');
	it('should allow tags to be added');
	it('should allow a poll to be added');

});
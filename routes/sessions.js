'use strict';

require('../models/Session');

module.exports.setup = function(app, mongoose){

	/*
	 * Session routes
	 */
	 var Session = mongoose.model('session');
	 var baseUrl = '/session'

	 //list all sessions
	 app.get(baseUrl,function(req,res){

	 	res.send('hello');

	 });

	 //create a new session
	 app.post(baseUrl,function(req,res){
	 	res.send('hello');
	 });
};
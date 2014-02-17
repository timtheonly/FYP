'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
	question: {type: String, required:true},
	session: Schema.Types.ObjectId,
	answers:[String],
	creator: {type:Schema.Types.ObjectId, required:true},
	open: Boolean,
	response:[Number]
},{collection:'poll'});


/*  List all global polls i.e. polls not attached to a session
 *	@param {Function} callback
 */
pollSchema.statics.listAllGlobals = function(callback){
	this.find({session:null},function(err,polls){
		if(err){callback(err);}
		callback(null,polls);
	});
};


/*  List all polls
 *	@param {Function} callback
 */
pollSchema.statics.listAll = function(callback){
	this.find({},function(err,polls){
		if(err){callback(err);}
		callback(null,polls);
	});
};


/*  set the specified poll to open
 *	@param {Function} callback
 *  @param {String} ID
 *  comment: should use update but doesn't seem to work
 *			 more research required
 */
pollSchema.statics.setOpen = function(ID,callback){
	this.findOne({_id:ID}, function(err, poll){
		if(err){callback(err);}
		poll.open = true;
		poll.save(function(err){
			if(err){callback(err);}
			callback(null,poll);
		});
	});
};


/*  set the specified poll to closed
 *	@param {Function} callback
 *  @param {String} ID
 *  comment: should use update but doesn't seem to work
 *			 more research required
 */
pollSchema.statics.setClosed = function(ID,callback){
	this.findOne({_id:ID}, function(err, poll){
		if(err){callback(err);}
		poll.open = false;
		poll.save(function(err){
			if(err){callback(err);}
			callback(null,poll);
		});
	});
};

/*  add an answer to the poll
 *	@param {Function} callback
 *  @param {String} answer
 */
pollSchema.statics.addAnswer =function(answer,ID,callback){
	this.findOne({_id:ID}, function(err, poll){
		if(err){callback(err);}
		poll.answers.push(answer);
		poll.save(function(err){
			if(err){callback(err);}
			callback(null,poll);
		});
	});
};

pollSchema.statics.input = function(response,ID,callback){
	this.findOne({_id:ID}, function(err, poll){
		if(err){callback(err);}
		poll.response[response]++;
		poll.save(function(err){
			if(err){callback(err);}
			callback(null,poll);
		});
	});
};

/*
 * delete the given Poll
 * @param {string} session id
 *
 */
pollSchema.statics.delete = function(ID,callback){
	this.remove({_id:ID},callback);
};


mongoose.model('poll', pollSchema);
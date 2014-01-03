'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
	question: {type: String, required:true},
	session: Schema.Types.ObjectId,
	answers:[String],
	creator: {type:Schema.Types.ObjectId, required:true},
	open: Boolean

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
pollSchema.methods.addAnswer =function(answer,callback){
	this.answers.push(answer);
	this.save(function(err){
		if(err){callback(err);}
		callback();
	});
};


mongoose.model('poll', pollSchema);
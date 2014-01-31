'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
	name: {type: String, required:true},
	tags: [String],
	creator: {type:Schema.Types.ObjectId, required:true},
	open: Boolean,
	poll: Schema.Types.ObjectId
},{collection:'session'});


/*
 * list all sessions
 *
 */
sessionSchema.statics.getAll = function(callback){
	this.find({},callback);
};

/*
 * set a poll to open using id
 * @param {string} poll id
 *
 */
sessionSchema.statics.setOpen = function(ID,callback){
	this.findOne({_id:ID}, function(err, session){
		if(err){callback(err);}
		session.open = true;
		session.save(function(err){
			if(err){callback(err);}
			callback(null,session);
		});
	});
};

/*
 * set a poll to closed using id
 * @param {string} poll id
 *
 */
sessionSchema.statics.setClosed = function(ID,callback){
	this.findOne({_id:ID}, function(err, session){
		if(err){callback(err);}
		session.open = false;
		session.save(function(err){
			if(err){callback(err);}
			callback(null,session);
		});
	});
};

/*
 * delete the given Session
 * @param {string} session id
 *
 */
sessionSchema.statics.delete = function(ID,callback){
	this.remove({_id:ID},callback);
}


/*
 * list all sessions
 */
sessionSchema.statics.getAll = function(callback){
	this.find({},callback);
};

/*
 * add a tag to a session
 * @param {String} tag to be added
 */
sessionSchema.methods.addTag = function(tag,callback){
	this.tags.push(tag);
	this.save(callback);
};

/*
 * add a Poll to the session
 * @param {String} id of poll to be added
 */
sessionSchema.methods.addPoll = function(pollId,callback){
	this.poll = pollId;
	this.save(callback);
};

mongoose.model('session', sessionSchema);
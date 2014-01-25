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

sessionSchema.statics.getAll = function(callback){
	this.find({},callback);
};

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

sessionSchema.methods.addTag = function(tag,callback){
	this.tags.push(tag);
	this.save(callback);
};

sessionSchema.methods.addPoll = function(pollId,callback){
	this.poll = pollId;
	this.save(callback);
};

mongoose.model('session', sessionSchema);
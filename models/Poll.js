'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
	question: {type: String, required:true},
	session: Schema.Types.ObjectId,
	answers:[String],
	creator: {type:Schema.Types.ObjectId, required:true},
	open: Boolean,

},{collection:'poll'});

pollSchema.statics.listAllGlobals = function(callback){
	this.find({session:null},function(err,polls){
		if(err){callback(err);}
		callback(null,polls);
	});
};

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

pollSchema.methods.addAnswer =function(answer,callback){
	this.answers.push(answer);
	this.save(function(err){
		if(err){callback(err);}
		callback();
	});
};


mongoose.model('poll', pollSchema);
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
	this.update({_id:ID},{$set:{open:true}},function(err,numAffected){
		if(err){return callback(err);}
		return callback(null, numAffected);
	});
};

pollSchema.statics.setClosed = function(ID,callback){
	this.update({_id:ID},{$set:{open:true}},function(err,numAffected){
		if(err){return callback(err);}
		return callback(null, numAffected);
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
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
	name: {type: String, required:true},
	tags: [String],
	creator: {type:Schema.Types.ObjectId, required:true},
	open: Boolean
},{collection:'session'});


sessionSchema.methods.addTag = function(tag,callback){
	this.tags.push(tag);
	this.save(callback);
};

mongoose.model('session', sessionSchema);
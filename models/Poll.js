'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
	question: {type: String, required:true},
	session: Schema.Types.ObjectId,
	answers:{type:[String], required:true},
	creator: {type:Schema.Types.ObjectId, required:true},
	open: Boolean,

},{collection:'poll'});

/*pollSchema.statics.getGlobalPolls = function(){

};*/

mongoose.model('poll', pollSchema);
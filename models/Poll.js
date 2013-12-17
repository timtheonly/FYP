'use strict'

var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema({
	question: String,
	answers:[String],
	creator:Schema.Types.ObjectId,
	open: Boolean
},{collection:'poll'});

mongoose.model('User', pollSchema);
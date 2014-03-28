'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
	name: {type: String, required:true},
	tags: [String],
	creator: {type:Schema.Types.ObjectId, required:true},
	open: Boolean,
	poll: Schema.Types.ObjectId,
    password:String
},{collection:'session'});



/*
 * set a poll to open using id
 * @param {string} poll id
 * @param {Function} callback
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
 * @param {Function} callback
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
 * @param {Function} callback
 *
 */
sessionSchema.statics.delete = function(ID,callback){
	this.remove({_id:ID},callback);
};


/*
 * list all sessions
 * @param {Function} callback
 */
sessionSchema.statics.getAll = function(callback){
	this.find({},callback);
};

/*
 * add a password to the session
 * @param {String} id of session
 * @param {String} password to be added
 * @param {Function} callback
 */
sessionSchema.statics.setPassword  = function(ID,password,callback){
    this.findOne({_id:ID},function(err,session){
        if(err){throw err;}
        session.password = password;
        session.save(function(err){
           if(err){return callback(err);}
           return callback(null,session);
        });
    });
};

/*
 * remove session password
 * @param {String} id of session
 * @param {Function} callback
 */
sessionSchema.statics.removePassword  = function(ID,callback){
    this.findOne({_id:ID},function(err,session){
        if(err){throw err;}
        session.password = null;
        session.save(function(err){
            if(err){return callback(err);}
            return callback(null,session);
        });
    });
};

/*
 * add a Poll to the session
 * @param {String} id of poll to be added
 * @param {Function} callback
 */
sessionSchema.methods.addPoll = function(pollId,callback){
	this.poll = pollId;
	this.save(callback);
};



mongoose.model('session', sessionSchema);
'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    ejs=require('ejs-locals'),
    mongoose = require('mongoose'),
    connect = require('connect'),
    socket = require('socket.io'),
    http = require('http');

var app = express();


//associate ejs files to ejs for templates
app.engine('ejs', ejs);
//set the views path
app.set('views',path.join(__dirname, 'app/views'));
//tell express that ejs is the templating engine
app.set('view engine','ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(connect.urlencoded());
app.use(connect.json());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.cookieParser());
app.use(express.session({secret:'reallyLongSecret12345355'}));
app.use(app.router);


mongoose = mongoose.connect('mongodb://localhost/FYP');


var server = http.createServer(app);
var io = socket.listen(server);
server.listen(9000);

console.log('Express server listening on port 9000');

// Routes
//dynamically include all routes
fs.readdirSync('./routes').forEach(function(filename){
  if(filename.substr(-3) === '.js')
  {
    require('./routes/'+filename).setup(app,mongoose, io);
  }
});

//handle 404 erros
app.use(function(req, res,next){
  res.render(404,'404');
});


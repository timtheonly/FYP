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
require('colors') //for coloured output to the console
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


mongoose = mongoose.connect('mongodb://localhost/FYP',function(err){
  if(err){
    console.log('Error:'.red + 'connection to mongodb refused!');
    process.exit(-1);
  }
});


var server = http.createServer(app);
var io = socket.listen(server);
server.listen(9000);

console.log('Express server listening on port 9000');

//take care of messages being sent/received
io.sockets.on('connection', function(socket){

    //send messages 
    socket.on('send',function(data){
      socket.broadcast.to(''+data.room).emit('question',data);
    });

    //select a different room
    socket.on('room',function(data){
        socket.join(''+data);
        console.log('someone joined room: '+ data);
      });
  });
// Routes
//dynamically include all routes
fs.readdirSync('./routes').forEach(function(filename){
  if(filename.substr(-3) === '.js')
  {
    require('./routes/'+filename).setup(app,mongoose, io);
  }
});

//handle 404 error
app.use(function(req, res){
  res.render(404,'404');
});


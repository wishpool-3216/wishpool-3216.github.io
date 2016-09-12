'use strict';

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var morgan = require('morgan')


// Boilerplate
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));



// Routes  
app.get('/', function(req,res, next){
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


// Error-handling  `
app.use(function(err, req, res, next){
	console.log(err);
	res.status(err.status || 500).send(err.message || 'Internal Server Error.');
});


// Start Server
var port = 3000;
app.listen(port, function(err) {
	if(err){
		throw err
	}else{
		console.log('Wishpool temporary server is up. Listening on port: ', port);
	}
})

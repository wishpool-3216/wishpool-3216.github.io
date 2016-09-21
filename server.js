'use strict';
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var morgan = require('morgan')


// Parsing and logging boilerplate
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


// Routes for dependencies
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));


// Route to serve public as "root"
app.use(express.static(__dirname + '/public'));


// If no routes match, serve /public/index.html   
app.get('/*', function(req,res){
	res.sendFile(path.join(__dirname, '/public/index.html'));
});


// Error handling middleware
app.use(function(err, req, res, next){
	console.log(err);
	res.status(err.status || 500).send(err.message || 'Internal Server Error.');
});


// Let server listen
var port = 4000;
app.listen(port, function(err) {
	if(err){
		throw err
	}else{
		console.log('Wishpool express server is running. Listening on port: ', port);
	}
})


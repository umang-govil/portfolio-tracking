var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var port = process.env.PORT || 3000;
var database = 'mongodb://127.0.0.1:27017/test';
var mongoose = require('mongoose');

var app = express();

module.exports = app;

mongoose.connect(database, function(err) {
	if (err) {
		console.log(err);
	} else
		console.log('Connected to the database');
});

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());
app.use(morgan('dev'));

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else
		console.log('Listening on port ' + port);
});

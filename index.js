var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var port = process.env.PORT || 3000;
var database = process.env.database;

var app = express();

module.exports = app;

mongoose.Promise = global.Promise;

mongoose.connect(database, {
	useNewUrlParser: true,
	useCreateIndex: true
}, function(err) {
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

var portfolio = require('./app/routes/route');
app.use('/portfolio', portfolio);

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else
		console.log('Listening on port ' + port);
});

/* global process, module */

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/app');
// may need to change this path

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('morgan')('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('API NAME', require('./controllers/CONTROLLERS NAME'))
    // need to change path above

// * gets all routes
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

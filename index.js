/* global process, module */
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

// JSON web token dependencies, including a secret key to sign the token
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;

var app = express();

var User = require('./models/user');
mongoose.connect('mongodb://localhost/stop_alarm');

// mongoose.connect('mongodb://localhost/app');
// may need to change this path

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('morgan')('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', require('./controllers/users.js'));
app.use('/api/stops', require('./controllers/stops.js'));
// need to change path above with expressJWT when ready

// * gets all routes
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// this middleware will check if expressJWT did not authorize the user, and return a message
// UNCOMMENT WHEN READY FOR AUTH
// app.use(function(err, req, res, next) {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).send({ message: 'You need an authorization token to view this information.' });
//     }
// });

// POST /api/auth - if authenticated, return a signed JWT
app.post('/api/auth', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        // return 401 if error or no user
        if (err || !user) return res.status(401).send({ message: 'User not found' });

        // attempt to authenticate a user
        var isAuthenticated = user.authenticated(req.body.password);
        // return 401 if invalid password or error
        if (err || !isAuthenticated) return res.status(401).send({ message: 'User not authenticated' });

        // sign the JWT with the user payload and secret, then return
        var token = jwt.sign(user.toJSON(), secret);

        return res.send({ user: user, token: token });
    });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

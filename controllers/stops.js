var express = require('express');
var Stop = require('../models/stop');
var request = require("request");
var router = express.Router();


router.route('/')
    .get(function(req, res) {
        // when we get user input of location, we can filter results that are displayed
        Stop.find(function(err, stops) {
            if (err) return res.status(505).send(err);

            return res.send(stops);
        });
    });

router.route('/:id')
    .get(function(req, res) {
        Stop.findById(req.params.id, function(err, user) {
            if (err) return res.status(500).send(err);

            return res.send(user);
        });
    });

module.exports = router;




// var url = `https://maps.googleapis.com/maps/api/distancematrix/json?key=` + key + `&origins=${origin}&destinations=${destination},-122.290512&units=imperial`;

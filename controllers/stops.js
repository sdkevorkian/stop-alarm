var express = require('express');
var Stop = require('../models/stop');
var router = express.Router();


router.route('/')
    .get(function(req, res) {
        // when we get user input of location, we can filter results that are displayed
        Stop.find(function(err, stops) {
            if (err) return res.status(505).send(err);

            return res.send(stops);
        });
    });


module.exports = router;

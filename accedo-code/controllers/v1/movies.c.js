var express = require('express');
var router = express.Router();

var movies = require(global.appPath + 'models/movies.m.js');
var responser = require(global.appPath + 'helpers/responser.h.js');

router.post('/fetch', function (req, res) {

    var filter = req.body;

    movies.fetch(filter).then(
        function (result) {
            var output = new responser();
            output.data = result;
            output.code = 200;
            output.message = "list of movies";
            return output.sendSuccess(res);
        },
        function (error) {
            var output = new responser();
            output.error = error;
            output.code = 500;
            output.message = "unable to connect to the end point";
        });

})

module.exports = router
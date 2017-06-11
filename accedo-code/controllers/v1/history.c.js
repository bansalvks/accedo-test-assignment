var express = require('express');
var router = express.Router();
var history = require(global.appPath + 'models/history.m.js');
var responser = require(global.appPath + 'helpers/responser.h.js');


router.post('/', function (req, res) {
    return new global.Promise(function (resolve, reject) {
        var his = new history();
        his.email = req.body.email;
        his.movie_id = req.body.movie_id;

        his.add().then(
            function (result) {
                var output = new responser();
                output.data = {
                    id: result.insertedId.toString()
                };
                output.code = 200;
                output.message = "Record has been inserted";
                return output.sendSuccess(res);
            },
            function (err) {
                var output = new responser();
                output.error = err;
                output.code = 500;
                output.message = "Record has not been inserted";
                return output.sendError(res);
            });
    });
})

router.get('/:email', function (req, res) {

    new history().get(req.params.email).then(
        function (result) {
            var output = new responser();
            output.data = result;
            output.code = 200;
            output.message = "Records";
            return output.sendSuccess(res);
        },
        function (err) {
            var output = new responser();
            output.error = err;
            output.code = 500;
            output.message = "Record not found";
            return output.sendError(res);
        });
})


module.exports = router
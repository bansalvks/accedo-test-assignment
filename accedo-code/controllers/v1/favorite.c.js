var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();
var favorite = require(global.appPath + 'models/favorite.m.js');
var responser = require(global.appPath + 'helpers/responser.h.js');


router.post('/', function (req, res) {
    return new global.Promise(function (resolve, reject) {
        var fav = new favorite();
        fav.email = req.body.email;
        fav.movie_id = req.body.movie_id;

        fav.add().then(
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

    new favorite().get(req.params.email).then(
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


router.delete('/', function (req, res) {

    var { id } = req.body;

    new favorite().remove(id).then(
        function (result) {
            var output = new responser();
            output.data = result;
            output.code = 200;
            output.message = "deleted";
            return output.sendSuccess(res);
        },
        function (err) {
            var output = new responser();
            output.error = err;
            output.code = 500;
            output.message = "Unable to delete record";
            return output.sendError(res);
        });
})


module.exports = router

module.exports = router
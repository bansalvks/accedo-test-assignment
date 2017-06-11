var express = require('express');
var router = express.Router();

var users = require(global.appPath + 'models/user.m.js');
var responser = require(global.appPath + 'helpers/responser.h.js');


router.post('/signin', function (req, res) {

    var { email, password } = req.body;

    new users().authenticate(email, password).then(
        function (result) {

            delete result.password;

            /// creating session
            res.cookie('token', result, {
                expires: new Date(Date.now() + (1000 * 60 * 60)),
                httpOnly: false
            })

            var output = new responser();
            output.data = result;
            output.code = 200;
            output.message = "Valid user and session is created";
            return output.sendSuccess(res);
        },
        function (err) {
            var output = new responser();
            output.error = err;
            output.code = 500;
            output.message = "invalid user";
            return output.sendError(res);
        }
    );


})

router.get('/signout', function (req, res) {

    if (!req.cookies.token.email) {
        var output = new responser();
        output.data = "User is not signed in";
        output.code = 200;
        output.message = "Nothing to sign out";
        return output.sendSuccess(res);
    }
    else {
        /// destroy session
        res.cookie('token', {}, {
            expires: 0,
            httpOnly: false
        })

        var output = new responser();
        output.data = "Signed out";
        output.code = 200;
        output.message = "Signed out";
        return output.sendSuccess(res);
    }
})

module.exports = router
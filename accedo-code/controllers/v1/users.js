var express = require('express');
var router = express.Router();

var users = require(global.appPath + 'models/user.m.js');

var responser = require(global.appPath + 'helpers/responser.h.js');

router.post('/register', function (req, res) {
    var body = req.body;

    var newUser = new users();

    newUser.first_name = body.first_name;
    newUser.last_name = body.last_name;
    newUser.email = body.email;
    newUser.password = body.password;

    newUser.registrationValidation().then(
        function (result) {
            newUser.create().then(
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
                }
            );
        },
        function (validationErrors) {
            var output = new responser();
            output.error = validationErrors;
            output.code = 500;
            output.message = "Record has some invalid/missing outputs inputs";
            return output.sendError(res);
        }
    );
})

router.post('/changePassword', function (req, res) {

    var { email, oldPassword, newPassword } = req.body;

    new users().changePassword(email, oldPassword, newPassword).then(
        function (result) {
            var output = new responser();
            output.data = result;
            output.code = 200;
            output.message = "Password has been changed";
            return output.sendSuccess(res);
        },
        function (err) {
            var output = new responser();
            output.error = err;
            output.code = 500;
            output.message = "Unable to change password";
            return output.sendError(res);
        }
    );

})

module.exports = router
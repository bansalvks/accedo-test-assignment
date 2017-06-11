var express = require('express');
var router = express.Router();

var responser = require(global.appPath + 'helpers/responser.h.js');


router.use(function (req, res, next) {
    if (!req.cookies.token || !req.cookies.token.email) {
        var output = new responser();
        output.data = "unauthorized";
        output.code = 401;
        output.message = "unauthorized";
        return output.sendError(res);
    }
    else {
        next();
    }
})

module.exports = router
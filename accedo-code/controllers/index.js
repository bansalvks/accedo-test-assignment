var path = require('path');
var express = require('express');
var router = express.Router();

var fsHelper = require(global.appPath + 'helpers/fs.h.js')

/// getting direcoties containg apies
var apiDirectories = fsHelper.getDirectories(__dirname);

/// getting all controllers
var controllersList = [];
apiDirectories.forEach(function (p) {
  controllersList = fsHelper.getAllFiles(path.normalize(__dirname + "/" + p));
}, this);

/// routing all controllers
controllersList.forEach(function (api) {
  var extension = path.parse(api)
  if (extension.ext.toLowerCase() === '.js') {
    var start = __dirname.length;
    var end = api.length - 3; /// minus 3 for removing extension

    /// api path
    var apiPath = api.substring(start, end);

    router.use(apiPath, require(api));
  }
}, this);

module.exports = router
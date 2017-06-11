var express = require('express');
var router = express.Router();

var usersV1 = require(global.appPath + 'controllers/v1/users.c.js')
var authV1 = require(global.appPath + 'controllers/v1/auth.c.js')
var moviesV1 = require(global.appPath + 'controllers/v1/movies.c.js')
var historyV1 = require(global.appPath + 'controllers/v1/history.c.js')
var favoriteV1 = require(global.appPath + 'controllers/v1/favorite.c.js')

var authMid = require(global.appPath + 'middlewares/auth.mid.js');


router.use('/v1/users', authMid)
router.use('/v1/users', usersV1)

router.use('/v1/movies', authMid)
router.use('/v1/movies', moviesV1)

router.use('/v1/history', authMid)
router.use('/v1/history', historyV1)

router.use('/v1/favorite', authMid)
router.use('/v1/favorite', favoriteV1)


router.use('/v1/auth', authV1)

module.exports = router
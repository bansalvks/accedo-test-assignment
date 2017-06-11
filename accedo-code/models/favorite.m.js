var config = require(global.appPath + 'config.js');
var database = require(global.appPath + 'helpers/database.h.js')(config.dbUrl);

var collectionName = 'favorite';

var favorite = function () {
    this.movie_id = '';
    this.email = '';
    this.tine_stamp = new Date()
}

favorite.prototype.add = function () {
    return new global.Promise((resolve, reject) => {

        var validationErrors = [];
        if (!this.email || this.email.length < 1) {
            validationErrors.push('email id not found')
        }
        if (!this.movie_id || this.movie_id.length < 1) {
            validationErrors.push('movie id not found')
        }

        if (validationErrors.length > 0) {
            return reject(validationErrors);
        }

        var hstry = {
            "movie_id": this.movie_id,
            "email": this.email,
            "tine_stamp": this.tine_stamp
        }

        database.insert(collectionName, hstry).then(
            function (result) {
                return resolve(result);
            },
            function (err) {
                return reject(err);
            }
        );
    });
}

favorite.prototype.get = function (email) {
    return new global.Promise(function (resolve, reject) {
        database.fetch(collectionName, { email: email }).then(
            function (result) {
                return resolve(result);
            },
            function (err) {
                return reject(err);
            }
        );
    });
}

favorite.prototype.remove = function (id) {
    return new global.Promise(function (resolve, reject) {
        database.remove(collectionName, id).then(
            function (result) {
                return resolve(result);
            },
            function (err) {
                return reject(err);
            }
        );
    });
}
module.exports = favorite;
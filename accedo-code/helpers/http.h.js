var https = require('https');

var get = function (url) {
    return new global.Promise(function (resolve, reject) {
        https.get(url, (res) => {
            var body = [];
            res.on('data', function (data) {
                body.push(data);
            });
            res.on('end', function () {
                body = body.join('');
                return resolve(body);
            });
        }).on('error', (e) => {
            return reject(e);
        });
    });
}

module.exports = {
    "get": get
}
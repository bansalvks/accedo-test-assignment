var crypto = require('crypto');

var hash = function (password) {
    return crypto.createHash('sha1').update(password).digest('base64')
}

module.exports = {
    hash: hash
}

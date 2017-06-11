var responser = function () {
    this.data = '';
    this.message = "";
    this.code = "";
}

responser.prototype.sendSuccess = function (res) {
    res.status(this.code).send(this);
}

responser.prototype.sendError = function (res) {
    res.status(this.code).send(this);
}

module.exports = responser;
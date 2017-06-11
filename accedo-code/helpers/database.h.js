var { MongoClient, ObjectID } = require('mongodb');


var dbMaker = function (url) {
    return new database(url);
}


var database = function (url) {
    this.url = url;
    this.db = null
}

database.prototype.getConnection = function () {
    return new global.Promise((resolve, reject) => {

        if (this.db && this.db.serverConfig.isConnected()) {
            return resolve(this.db)
        }

        MongoClient.connect(this.url, (err, db) => {
            if (err) {
                return reject(err);
            }
            this.db = db;
            return resolve(db);
        });
    });
}

database.prototype.insert = function (collection, data) {
    return new global.Promise((resolve, reject) => {
        this.getConnection().then(
            function (db) {
                db.collection(collection).insertOne(data,
                    function (err, res) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(res);
                    });
            },
            function (error) {
                return reject(error);
            },
            function () {
                db.close();
            }
        );
    });
}

database.prototype.remove = function (collection, id) {
    return new global.Promise((resolve, reject) => {
        this.getConnection().then(
            function (db) {
                var query = { _id: new ObjectID(id) };
                db.collection(collection).remove(query, function (err, obj) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(obj.result.n);
                });
            },
            function (error) {
                return reject(error);
            },
            function () {
                db.close();
            }
        );
    });
}

database.prototype.fetch = function (collection, query) {
    return new global.Promise((resolve, reject) => {
        this.getConnection().then(
            function (db) {
                db.collection(collection).find(query).toArray(function (err, result) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(result);
                });
            },
            function (error) {
                return reject(error);
            },
            function () {
                db.close();
            }
        );
    });
}

database.prototype.update = function (collection, query, data) {
    return new global.Promise((resolve, reject) => {
        this.getConnection().then(
            function (db) {
                db.collection(collection).update(query, { "$set": data }, function (err, res) {
                    if (err)
                        return reject(err);
                    return resolve(res.result.nModified);
                });
            },
            function (error) {
                return reject(error);
            },
            function () {
                db.close();
            }
        );
    });
}

module.exports = dbMaker;
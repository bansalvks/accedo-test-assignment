var http = require(global.appPath + 'helpers/http.h.js');

var _ = require('lodash')

var fetch = function (filter) {
    return new global.Promise(function (resolve, reject) {
        var url = 'https://demo2697834.mockable.io/movies'
        http.get(url).then(
            function (data) {
                var list = JSON.parse(data).entries;


            

                if (filter.title && filter.title.length > 0)
                    list = _.filter(list, function (o) {
                        return o.title.toLowerCase().indexOf(filter.title) > -1;
                    })

                if (filter.description && filter.description.length > 0)
                    list = _.filter(list, function (o) {
                        return o.description.toLowerCase().indexOf(filter.description) > -1;
                    })

                return resolve(list);
            },
            function (error) {
                return reject(error)
            });
    });
}

module.exports = {
    fetch: fetch
};
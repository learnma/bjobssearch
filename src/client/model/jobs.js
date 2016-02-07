/*eslint no-unused-vars: 0*/
var _ = require('lodash');

function Jobs(_alljobs) {
    var alljobs = _alljobs;
    var filters = new Map();

    var get = function() {
        var jobs = alljobs;
        for (var filter of filters.values()) {
            jobs = jobs.filter(j => eval(filter));
        }
        return jobs;
    };

    var addFilter = function(name, filter) {
        filters.set(name, filter);
        return this;
    };

    var removeFilter = function(name) {
        filters.delete(name);
    };

    var getFilter = function(name) {
        return filters.get(name);
    };

    return {
        get: get,
        addFilter: addFilter,
        removeFilter: removeFilter,
        getFilter: getFilter
    };
}

module.exports = Jobs;

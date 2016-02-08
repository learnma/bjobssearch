/*eslint no-unused-vars: 0*/
var _ = require('lodash');
var moment = require('moment');

function Jobs(_alljobs) {
    var alljobs = _alljobs;
    var filters = new Map();
    var sortCriteria = undefined;

    var get = function() {
        var jobs = alljobs;
        for (var filter of filters.values()) {
            jobs = jobs.filter(j => eval(filter));
        }
        if (sortCriteria) {
            jobs = _.sortBy(jobs, j => eval(sortCriteria));
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

    var setSortCriteria = function(criteria) {
        sortCriteria = criteria;
    };

    var removeSortCriteria = function() {
        sortCriteria = undefined;
    };

    var getSortCriteria = function() {
        return sortCriteria;
    };

    return {
        get: get,
        addFilter: addFilter,
        removeFilter: removeFilter,
        getFilter: getFilter,
        setSortCriteria: setSortCriteria,
        removeSortCriteria: removeSortCriteria,
        getSortCriteria: getSortCriteria
    };
}

function createJobs(_alljobs) {
    return new Jobs(_alljobs);
}

module.exports = {
    create: createJobs
};

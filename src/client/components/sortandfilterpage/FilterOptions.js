import _ from 'lodash';
var jobsdata = require('../searchpage/jobs-data').getJobs();

module.exports = {
    SalaryFilters: [
        {display: 'no filter', value: 'clear'},
        {display: '< INR 3999', value: 'j.salary < 3999'},
        {display: 'INR 4000 - 7999', value: 'j.salary > 3999 && j.salary < 8000'},
        {display: 'INR 8000 - 11999', value: 'j.salary > 7999 && j.salary < 12000'},
        {display: 'INR 12000 - 15999', value: 'j.salary > 11999 && j.salary < 16000'},
        {display: 'INR 16000 - 19999', value: 'j.salary > 15999 && j.salary < 20000'},
        {display: '> INR 20000', value: 'j.salary > 20000'}
    ],

    GenderFilters: [
        {display: 'no filter', value: 'clear'},
        {display: 'Male', value: 'j.gender === "male"'},
        {display: 'Female', value: 'j.gender === "female"'}
    ],

    ExperienceFilters: [
        {display: 'no filter', value: 'clear'},
        {display: 'None/Fresher', value: 'j.experience === 0'},
        {display: '1 - 4 Yrs', value: 'j.experience >= 1 && j.experience <= 4'},
        {display: '5 - 7 Yrs', value: 'j.experience >= 5 && j.experience <= 7'},
        {display: '8 - 10 Yrs', value: 'j.experience >= 8 && j.experience <= 10'},
        {display: '> 10 Yrs', value: 'j.experience > 8'}
    ],

    TimingsFilters: [
        {display: 'no filter', value: 'clear'},
        {display: 'Part Time - Mornings', value: 'j.parttime === true'},
        {display: 'Part Time - Afternoon', value: 'j.parttime === true'},
        {display: 'Day Shift', value: 'j.parttime === false'}
    ],

    PincodeFilters: function() {
        if (!jobsdata) {
            return [];
        }
        var pincodes = _.pluck(jobsdata, 'address.pincode');
        pincodes = _.uniq(pincodes);
        var data = pincodes.map(p => {
            return {
                display: p.toString(),
                value: 'j.address.pincode === ' + p
            };
        });
        data.unshift(data, {display: 'no filter', value: 'clear'});
        return data;
    }(),

    DateFilters: function() {
        return [
            {display: 'no filter', value: 'clear'},
            {display: '30 days', value: 'moment().diff(moment(j.date, "DD-MM-YYYY"), "days") <= 30'},
            {display: '60 days', value: 'moment().diff(moment(j.date, "DD-MM-YYYY"), "days") <= 60'},
            {display: '90 days', value: 'moment().diff(moment(j.date, "DD-MM-YYYY"), "days") <= 90'},
            {display: '120 days', value: 'moment().diff(moment(j.date, "DD-MM-YYYY"), "days") <= 120'}
        ];
    }(),

    SortCriterias: [
        {display: 'no sort', value: 'clear'},
        {display: 'Freshness', value: '-moment(j.date, "DD-MM-YYYY")'},
        {display: 'Highest Salary', value: '-j.salary'},
        {display: 'Lowest  Salary', value: 'j.salary'}
    ]

};

import React from 'react';
import FilterOptions from './FilterOptions';
import Filter from './Filter';

var {
    SalaryFilters,
    GenderFilters,
    ExperienceFilters, 
    TimingsFilters,
    PincodeFilters,
    DateFilters,
    SortCriterias
} = FilterOptions;


class SortAndFilterPage extends React.Component {

    render() {
        var {
                defaultSalaryFilter, 
                onSalaryFilter,
                defaultGenderFilter,
                onGenderFilter,
                defaultExpFilter,
                onExpFilter,
                defaultTimingsFilter,
                onTimingsFilter,
                defaultPincodeFilter,
                onPincodeFilter,
                defaultDateFilter,
                onDateFilter,
                defaultSortCriteria,
                onSortCriteria
            } = this.props;

        return (
            <div>
                <h4>Sort Results</h4>
                <Filter
                    label=""
                    options={SortCriterias}
                    defaultValue={defaultSortCriteria}
                    onFilter={onSortCriteria} />

                <h4>Filter Results</h4>
                <Filter 
                    label="SALARY RANGE"
                    options={SalaryFilters}
                    defaultValue={defaultSalaryFilter}
                    onFilter={onSalaryFilter} />

                <Filter 
                    label="GENDER"
                    options={GenderFilters}
                    defaultValue={defaultGenderFilter}
                    onFilter={onGenderFilter} />

                <Filter 
                    label="EXPERIENCE"
                    options={ExperienceFilters}
                    defaultValue={defaultExpFilter}
                    onFilter={onExpFilter} />

                <Filter 
                    label="TIMINGS"
                    options={TimingsFilters}
                    defaultValue={defaultTimingsFilter}
                    onFilter={onTimingsFilter} />

                <Filter
                    label="PINCODE"
                    options={PincodeFilters}
                    defaultValue={defaultPincodeFilter}
                    onFilter={onPincodeFilter} />

                <Filter
                    label="JOBS POSTED WITHIN"
                    options={DateFilters}
                    defaultValue={defaultDateFilter}
                    onFilter={onDateFilter} />
            </div>
        );
    }
}

module.exports = SortAndFilterPage;

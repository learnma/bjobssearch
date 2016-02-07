import _ from 'lodash';
import React from 'react';
import SortAndFilterPage from '../sortandfilterpage/SortAndFilterPage'; 
import SearchInput from '../searchinput/SearchInput';
import SearchResults from '../searchresults/SearchResults';
import Jobs from '../../model/jobs';

var jobsdata = require('./jobs-data');
var keys = _.uniq(_.flatten(_.pluck(jobsdata, 'tags')));

class SearchMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobsdata: jobsdata,
            jobsobj: new Jobs(jobsdata)
        };
    }

    onkeyChanged(key) {
        var jobsdataSearched;
        if (key) {
            jobsdataSearched = _.filter(jobsdata, j => j.tags.indexOf(key) !== -1);
        } else {
            jobsdataSearched = jobsdata;
        }
        this.setState({
            jobsdata: jobsdataSearched,
            jobsobj: new Jobs(jobsdataSearched)
        });
    }

    handleFilterChange(name, value) {
        var jobsobj = this.state.jobsobj;
        jobsobj.removeFilter(name);
        if (value !== 'clear') {
            jobsobj.addFilter(name, value);
        }
        this.setState({
            jobsobj: jobsobj
        });
    }

    handleSortCriteriaChange(criteria) {
        var jobsobj = this.state.jobsobj;
        jobsobj.removeSortCriteria();
        if (criteria !== 'clear') {
            jobsobj.setSortCriteria(criteria);
        }
        this.setState({
            jobsobj: jobsobj
        });

    }

    render() {
        var {jobsobj} = this.state;
        var jobitems = jobsobj.get();
        var defaultSalaryFilter = jobsobj.getFilter('filterbysal');
        var defaultGenderFilter = jobsobj.getFilter('filterbygender');
        var defaultExpFilter = jobsobj.getFilter('filterbyexp');
        var defaultTimingsFilter = jobsobj.getFilter('filterbytimings');
        var defaultPincodeFilter = jobsobj.getFilter('filterbypincode');
        var defaultDateFilter = jobsobj.getFilter('filterbydate');
        var defaultSortCriteria = jobsobj.getSortCriteria();

        return(
            <div className="container">
                <div className="col-sm-3">
                    <SortAndFilterPage 
                            defaultSalaryFilter={defaultSalaryFilter}
                            onSalaryFilter={f => this.handleFilterChange('filterbysal', f)}
                            defaultGenderFilter={defaultGenderFilter}
                            onGenderFilter={f => this.handleFilterChange('filterbygender', f)}
                            defaultExpFilter={defaultExpFilter}
                            onExpFilter={f => this.handleFilterChange('filterbyexp', f)}
                            defaultTimingsFilter={defaultTimingsFilter}
                            onTimingsFilter={f => this.handleFilterChange('filterbytimings', f)}
                            defaultPincodeFilter={defaultPincodeFilter}
                            onPincodeFilter={f => this.handleFilterChange('filterbypincode', f)}
                            defaultDateFilter={defaultDateFilter}
                            onDateFilter={f => this.handleFilterChange('filterbydate', f)}
                            defaultSortCriteria={defaultSortCriteria}
                            onSortCriteria={f => this.handleSortCriteriaChange(f)}
                     />
                </div>

                <div className="col-sm-9">
                    <SearchInput 
                        allkeys={keys}
                        onKeyChanged={key => this.onkeyChanged(key)}
                    />
                    <SearchResults jobitems={jobitems}/>
                </div>

            </div>
        );
    }
}

export default SearchMain;

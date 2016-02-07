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
        var jobsdataSearched = _.filter(jobsdata, j => j.tags.indexOf(key) !== -1);
        this.setState({
            jobsdata: jobsdataSearched,
            jobsobj: new Jobs(jobsdataSearched)
        });
    }

    handleSalaryChange(filter) {
        var jobsobj = this.state.jobsobj;
        jobsobj.removeFilter('filterbysal');
        if (filter !== 'clear') {
            jobsobj.addFilter('filterbysal', filter);
        }
        this.setState({
            jobsobj: jobsobj
        });
    }

    render() {
        var {jobsobj} = this.state;
        var jobitems = jobsobj.get();
        var defaultSalaryFilter = jobsobj.getFilter('filterbysal');

        return(
            <div className="container">
                <div className="col-sm-2">
                    <SortAndFilterPage 
                            defaultSalaryFilter={defaultSalaryFilter}
                            onSalaryFilter={f => this.handleSalaryChange(f)}
                     />
                </div>

                <div className="col-sm-8">
                    <SearchInput 
                        allkeys={keys}
                        onKeyChanged={key => this.onkeyChanged(key)}
                    />
                    <SearchResults jobitems={jobitems}/>
                </div>

                <div className="col-sm-2">
                    ad
                </div>
            </div>
        );
    }
}

export default SearchMain;

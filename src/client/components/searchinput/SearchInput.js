import React from 'react';
import SearchableInput from '../utils/SearchableInput';

class SearchInput extends React.Component {

    render() {
        var {allkeys} = this.props;

        return(
            <div className="well">
                <div className="row">
                    <h4>Search Jobs in Bangalore</h4>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <SearchableInput 
                            tags={allkeys}
                            onSelected={tag => this.props.onKeyChanged(tag)}
                        />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = SearchInput;

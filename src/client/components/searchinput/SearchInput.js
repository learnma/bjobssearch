import React from 'react';
import SearchableInput from '../utils/SearchableInput';

/**
 * This components provides a space to key in the search word.
 * It simply abstracts the utility component 'SearchableInput'
 * for key in and auto suggestion.
 *
 * API:
 * ---
 *  <SearchInput 
 *      allkeys      : [string] all completion keywords (jobs)
 *      onKeyChanged : callback to notified on keyword selection
 *  />
 */
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

SearchInput.propTypes = {
    allkeys: React.PropTypes.array.isRequired,
    onKeyChanged: React.PropTypes.func.isRequired
};

module.exports = SearchInput;

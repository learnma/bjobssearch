import React from 'react';
import JobItemList from './JobItemList';


class SearchResults extends React.Component {
    render() {
        var {jobitems} = this.props;

        return (
            <div>
                <div className="row">
                    <div className="pull-right">
                        <b>Found {jobitems.length} jobs</b>
                    </div>
                </div>
                <div className="row">
                    <JobItemList jobitems={jobitems} />
                </div>
            </div>
        );
    }
}

module.exports = SearchResults;

import _ from 'lodash';
import React from 'react';
import JobItem from './JobItem';

class JobItemList extends React.Component {

    render() {
        var {jobitems} = this.props;
        var jobitemNodes = jobitems.map(item => {
            var id = _.uniqueId();
            return <JobItem key={id} jobitem={item} />;
        });
        return (
            <div style={{height: '600px', overflow: 'auto'}}>
                {jobitemNodes}
            </div>
        );
    }
}

module.exports = JobItemList;

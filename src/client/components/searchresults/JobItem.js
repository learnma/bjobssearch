var moment = require('moment');
import _ from 'lodash';
import React from 'react';

var jobItemStyle = {
    backgroundColor: '#e8e0ce'
};

class JobItem extends React.Component {

    render() {
        var {address, sponsoredby, name, salary, description, date} = this.props.jobitem;
        var descItems = description.map(d => {
            return (
                <div key={_.uniqueId()}>
                    <span>{d}</span><br />
                </div>
            );
        });
        return (
            <div className="well">
                <div className="well" style={jobItemStyle}>
                    <span style={{fontSize: '12px', color: '#b1b1b1'}}>{address.street}</span>
                    <br/>
                    <span style={{fontSize: '28px', color: '#5977b5'}}>{name}</span>
                    <br />
                    <span style={{fontSize: '18px', color: 'black'}}>Sponspored by </span><span style={{color: '#5977b5'}}>{sponsoredby}</span>
                    <br />
                    <span style={{fontSize: '16px', color: '#ac5353'}}>INR {salary} / month</span>
                    <br />
                    <br />
                    {descItems}
                    <br />
                    <span className="pull-right" style={{fontSize: '11px', color: '#b1b1b1'}}>{moment(date, 'DD-MM-YYYY').fromNow()}</span>
                </div>
            </div>
        );
    }
}

module.exports = JobItem;

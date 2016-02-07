import _ from 'lodash';
import React from 'react';

class OptionSelector extends React.Component {
    render() {
        var {label, options} = this.props;
        var optionNodes = options.map(option => {
            return <option 
                       key={_.uniqueId()} 
                       value={option.value}>
                        {option.display}
                   </option>;
        });

        return (
            <div className="form-group">
                {label ? <label htmlFor="sel1">{label}</label> : null}
                <select className="form-control" 
                        id="sel1" 
                        onChange={this.props.onChange}
                        value={this.props.defaultValue}>
                    {optionNodes}
                </select>
            </div>
        );
    }
}

module.exports = OptionSelector;

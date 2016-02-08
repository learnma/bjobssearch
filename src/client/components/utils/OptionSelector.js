import _ from 'lodash';
import React from 'react';

/**
 * Provides ability present to the user a set of options
 * that he can pick with.
 *
 * API:
 * ----
 *  <OptionSelector
 *      label        : (string) lable to be displayed (optional)
 *      options      : (array) options to be displayed
 *      onChange     : method to be notified when an option is picked
 *      defaultValue : initial option that is to be selected
 *  />
 *
 *  The options are provides in below format:
 *  [
 *      {display: 'option1', value: 'opt1val'}
 *  ]
 *
 *  When onChange is invoked, the value is provided for the
 *  selected option
*/

class OptionSelector extends React.Component {

    render() {
        var {label, options, onChange, defaultValue} = this.props;

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
                        onChange={onChange}
                        value={defaultValue}>
                    {optionNodes}
                </select>
            </div>
        );
    }

}

OptionSelector.propTypes = {
    label: React.PropTypes.string,
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    defaultValue: React.PropTypes.string.isRequired
};

module.exports = OptionSelector;

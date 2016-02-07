import React from 'react';
import OptionSelector from '../utils/OptionSelector';

class Filter extends React.Component {

    render() {
        var {label, options, defaultValue, onFilter} = this.props;
        if (!defaultValue) {
            defaultValue = 'clear';
        }
        defaultValue = defaultValue.trim();

        return (
            <OptionSelector
                label={label}
                options={options}
                onChange={e => onFilter(e.target.value)}
                defaultValue={defaultValue} />
        );

    }
}

module.exports = Filter;

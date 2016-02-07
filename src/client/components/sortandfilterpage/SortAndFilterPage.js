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
                <label htmlFor="sel1">{label}</label>
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

class SalaryRangeFilter extends React.Component {

    handleSalaryChange(e) {
        var {onFilter} = this.props;
        onFilter(e.target.value);
    }

    render() {
        var {defaultValue} = this.props;
        if (!defaultValue) {
            defaultValue = 'clear';
        }
        defaultValue = defaultValue.trim();

        var options = [
            {display: 'no filter', value: 'clear'},
            {display: '< INR 3999', value: 'j.salary < 3999'},
            {display: 'INR 4000 - 7999', value: 'j.salary > 3999 && j.salary < 8000'},
            {display: 'INR 8000 - 11999', value: 'j.salary > 7999 && j.salary < 12000'},
            {display: 'INR 12000 - 15999', value: 'j.salary > 11999 && j.salary < 16000'},
            {display: 'INR 16000 - 19999', value: 'j.salary > 15999 && j.salary < 20000'},
            {display: '> INR 20000', value: 'j.salary > 20000'}
        ];
        return (
            <OptionSelector 
                label="Salary Range"
                options={options}
                onChange={e => this.handleSalaryChange(e)} 
                defaultValue={defaultValue}/>
        );
    }
}

class SortAndFilterPage extends React.Component {
    render() {
        var {defaultSalaryFilter, onSalaryFilter} = this.props;

        return (
            <div>
                <h4>Filter Results</h4>
                <SalaryRangeFilter defaultValue={defaultSalaryFilter} onFilter={onSalaryFilter}/>
            </div>
        );
    }
}

module.exports = SortAndFilterPage;

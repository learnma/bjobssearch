import _ from 'lodash';
import React from 'react';

import Dropdown from './DropDown';

/**
 * This is an abstarction to combine an input and suggestion 
 * dropdown component. As user keys in the input, the auto suggestion
 * is populated with the items. The items are provided as input.
 *
 * API:
 * ---
 *  <SearchableInput 
 *      tags        : [array] string. the tags to help in completion
 *      onSelected  : callback to be invoked after user makes a selectiion
 *                      (or) enter ths value in input
 *   />
 */
class SearchableInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showdropdown: false,
            input: ''
        };
    }

    onInputChanged(e) {
        let partialInput = e.target.value;
        this.refs.myInput.value = partialInput;
        this.setState({
            showdropdown: false
        });

        if (partialInput.length >= 2) {
            this.setState({
                showdropdown: true
            });
        }
        this.input = partialInput;
    }

    onInputBlur() {
        setTimeout(() => {
            this.setState({
                showdropdown: false
            });
        }, 300);
    }

    onSelectedFromDropdown(tag) {
        var {onSelected} = this.props;
        this.refs.myInput.value = tag;
        onSelected(tag);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            showdropdown: false
        });
        var tag = this.refs.myInput.value;
        var {onSelected} = this.props;
        onSelected(tag);
    }

    render() {
        var dropdown = undefined;
        var {tags} = this.props;
        if (this.state.showdropdown) {
            var re = new RegExp(this.input, 'i');
            var filter = _.filter(tags, j => j.match(re));
            if (filter.length > 0) {
                dropdown = <Dropdown 
                    onSelected={(tag) => this.onSelectedFromDropdown(tag)}
                    tags={filter} 
                    prefix={this.input} />;
            }
        }
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <div className="form-group holder">
                        <input 
                            placeholder="Search jobs (eg. driver, cook, etc)"
                            ref="myInput"
                            className="form-control"
                            onFocus={e => this.onInputChanged(e)}
                            onChange={e => this.onInputChanged(e)}
                            onBlur={e => this.onInputBlur(e)}
                            ariaDescribedby="basic-addon1"
                            type="text" />
                    {dropdown}
                </div>
            </form>
        );
    }
}

SearchableInput.propTypes = {
    tags: React.PropTypes.array.isRequired,
    onSelected: React.PropTypes.func.isRequired
};

module.exports = SearchableInput;


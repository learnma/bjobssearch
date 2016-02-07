import _ from 'lodash';
import React from 'react';

class Dropdown extends React.Component {

    handleClick(evt, e) {
        this.props.onSelected(e);
    }

    render() {
        var result = this.props.tags.map(e => {
            //var tail = e.substring(this.props.prefix.length);
            return (<li key={_.uniqueId()} onClick={evt => this.handleClick(evt, e)}>
                        <span>
                            {e}
                        </span>
                    </li>);
        });
        return (
            <div className="dropdown">
                <ul>
                    {result} 
                </ul>
            </div>
        );
    }

}

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

    onSelected(tag) {
        var {onSelected} = this.props;
        this.refs.myInput.value = tag;
        onSelected(tag);
    }

    render() {
        var dropdown = undefined;
        var {tags} = this.props;
        if (this.state.showdropdown) {
            //var filter = _.filter(tags, j => j.startsWith(this.input));
            var re = new RegExp(this.input, 'i');
            var filter = _.filter(tags, j => j.match(re));
            dropdown = <Dropdown 
                            onSelected={(tag) => this.onSelected(tag)}
                            tags={filter} 
                            prefix={this.input} />;
        }
        return (
            <div className="form-group holder">
                <input 
                    ref="myInput"
                    className="form-control"
                    onFocus={e => this.onInputChanged(e)}
                    onChange={e => this.onInputChanged(e)}
                    onBlur={e => this.onInputBlur(e)}
                    type="text" />
                {dropdown}
            </div>
        );
    }
}

module.exports = SearchableInput;


import _ from 'lodash';
import React from 'react';

class Dropdown extends React.Component {

    handleClick(evt, e) {
        this.props.onSelected(e);
    }

    render() {
        var result = this.props.tags.map(e => {
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

module.exports = Dropdown;

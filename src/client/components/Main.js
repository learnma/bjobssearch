import React from 'react';
import Header from './header/Header';

class Main extends React.Component {

    render() {
        return(
            <div className="main-container">
                <Header />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Main;

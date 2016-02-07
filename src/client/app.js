/*eslint no-unused-vars: 0*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './config/routes';

require('./styles/bootstrap.css');
require('./styles/app.scss');
require('jquery');

ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('app')
);

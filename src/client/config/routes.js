/*eslint no-unused-vars: 0*/
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Main from '../components/Main';
import SearchMain from '../components/searchpage/SearchMain';

export default (
    <Route path="/" component={Main}>
        <IndexRoute component={SearchMain} />
        <Route path="tasks" component={SearchMain} />
    </Route>
);

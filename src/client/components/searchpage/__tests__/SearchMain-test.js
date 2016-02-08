/*eslint no-unused-vars: 0*/
jest.dontMock('underscore');
jest.dontMock('../SearchMain');
jest.dontMock('../../../model/jobs');

var mockJobs = [
    {
        name: 'Driver',
        salary: 10000,
        tags:['Driver', 'Taxi driver']
    },
    {
        name: 'Cook',
        salary: 15000,
        tags: ['cook', 'nice cook']
    }
];

var jobsdata = require('../jobs-data');
jobsdata.getJobs.mockReturnValue(mockJobs);

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
var JobsFactory = require('../../../model/jobs');
import SearchInput from '../../searchinput/SearchInput';
import SearchResults from '../../searchresults/SearchResults';
import SortAndFilterPage from '../../sortandfilterpage/SortAndFilterPage';
const SearchMain = require('../SearchMain');

describe('Search page tests', () => {

    var component, domElem;

    var createComponent= () => {
        component = TestUtils.renderIntoDocument(
            <SearchMain />
        );

        domElem = ReactDOM.findDOMNode(component);
    };

    var getChildComponent = (child) => {
        return TestUtils.scryRenderedComponentsWithType(component, child);
    };

    var getChildNodeOfType = (type) => {
        return TestUtils.findRenderedDOMComponentWithTag( component, type);
    };

    beforeEach(() => {
        createComponent();
    });

    it('should pass right parameters to SearchInput', () => {
        // Arrange
        var searchInput = getChildComponent(SearchInput)[0];

        // Act
        var props = searchInput.props;

        // Assert
        expect(props.allkeys).toEqual(['Driver', 'Taxi driver', 'cook', 'nice cook']);
    });

    it('should pass 0 search items if search tags maches no jobs', () => {
        // Arrange
        var searchInput = getChildComponent(SearchInput)[0];
        var searchResults = getChildComponent(SearchResults)[0];
        
        // Act
        searchInput.props.onKeyChanged('xxxxx');

        // Assert
        expect(searchResults.props.jobitems).toEqual([]);
    });

    it('should pass "searched" items to SearchResults for display', () => {
        // Arrange
        var searchInput = getChildComponent(SearchInput)[0];
        var searchResults = getChildComponent(SearchResults)[0];
        
        // Act
        searchInput.props.onKeyChanged('driver');

        // Assert
        var expected = [];
        expected.push(mockJobs[0]);
        expect(searchResults.props.jobitems).toEqual(expected);
    });

    it('should pass right parameters for SortAndFilterPage', () => {
        // Arrange
        var sortAndFilterPage = getChildComponent(SortAndFilterPage)[0];
        var salaryFilterChangeFn = sortAndFilterPage.props.onSalaryFilter;

        // Act
        salaryFilterChangeFn('j.salary > 11000');

        // Assert
        expect(sortAndFilterPage.props.defaultSalaryFilter).toBe('j.salary > 11000');
    });

    it('should pass salary filtered jobs', () => {
        // Arrange
        var sortAndFilterPage = getChildComponent(SortAndFilterPage)[0];
        var searchResults = getChildComponent(SearchResults)[0];
        var salaryFilterChangeFn = sortAndFilterPage.props.onSalaryFilter;

        // Act
        salaryFilterChangeFn('j.salary > 11000');

        // Assert
        var expected = [];
        expected.push(mockJobs[1]);
        expect(searchResults.props.jobitems).toEqual(expected);
    });

    it('should send sorted items to display', () => {
        // Arrange
        var sortAndFilterPage = getChildComponent(SortAndFilterPage)[0];
        var searchResults = getChildComponent(SearchResults)[0];
        var sortCriteriaFn = sortAndFilterPage.props.onSortCriteria;

        // Act
        sortCriteriaFn('-j.salary');

        // Assert
        var expected = [];
        expected.push(mockJobs[1]);
        expected.push(mockJobs[0]);
        expect(searchResults.props.jobitems).toEqual(expected);

    });
});

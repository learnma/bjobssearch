/*eslint no-unused-vars: 0*/
jest.dontMock('../SearchInput');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const SearchInput = require('../SearchInput');
import SearchableInput from '../../utils/SearchableInput';

describe('Search Input tests', () => {

    var component, domElem;
    var allkeys, onKeyChanged;

    var createComponent= (allkeys, onKeyChanged) => {
        component = TestUtils.renderIntoDocument(
            <SearchInput
                allkeys={allkeys}
                onKeyChanged={onKeyChanged} />
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
        allkeys = ['driver', 'driver with badge', 'cook'];
        onKeyChanged = jest.genMockFunction();
        createComponent(allkeys, onKeyChanged);
    });

    it('should passon the keys to SearchableInput', () => {
        // Assert
        var searchableInput = getChildComponent(SearchableInput)[0];
        expect(searchableInput.props.tags).toEqual(allkeys);
    });

    it('should notify th ecaller if there is change in search term', () => {
        // Arrange
        var searchableInput = getChildComponent(SearchableInput)[0];

        // Act
        searchableInput.props.onSelected('driver');
    
        // Assert
        expect(onKeyChanged.mock.calls[0][0]).toBe('driver');
    });

});

/*eslint no-unused-vars: 0*/
jest.dontMock('underscore');
jest.dontMock('../SearchableInput');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const SearchableInput = require('../SearchableInput');
import Dropdown from '../DropDown';

describe('SearchableInput tests', () => {

    var component, domElem;
    var tags, onSelected;

    var createComponent= (tags, onSelected) => {
        component = TestUtils.renderIntoDocument(
            <SearchableInput tags={tags} onSelected={onSelected} />
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
        tags = ['apple', 'apricot', 'mango', 'maza', 'manza'];
        onSelected = jest.genMockFunction();

        createComponent(tags, onSelected);
        
    });

    it('should NOT show dropdown by default', () => {
        var dropDownComp = getChildComponent(Dropdown);
        expect(dropDownComp.length).toBe(0);
    });

    it('should show dropdown after 2 chars are pressed', () => {
        // Act
        var inputNode = getChildNodeOfType('input');
        TestUtils.Simulate.change(inputNode, {target: {value: 'ap'}});

        // Assert
        var dropDownComp = getChildComponent(Dropdown);
        expect(dropDownComp.length).toBe(1);
    });

    it('should pass the properties to Dropdown correctly' , () => {
        // Act
        var inputNode = getChildNodeOfType('input');
        TestUtils.Simulate.change(inputNode, {target: {value: 'ap'}});

        // Assert
        var dropDownComp = getChildComponent(Dropdown)[0];
        var props = dropDownComp.props;
        expect(props['tags']).toEqual(['apple', 'apricot']);
        expect(props['prefix']).toBe('ap');
    });

    it('should set input value when Dropdown notify its selection', () => {
        // Act
        var inputNode = getChildNodeOfType('input');
        TestUtils.Simulate.change(inputNode, {target: {value: 'ap'}});
        var dropDownComp = getChildComponent(Dropdown)[0];
        var props = dropDownComp.props;
        props.onSelected('apple');

        // Assert
        expect(inputNode.value).toBe('apple');
    });

    it('should notify the caller in-turn when notified from Dropdown', () => {
        // Act
        var inputNode = getChildNodeOfType('input');
        TestUtils.Simulate.change(inputNode, {target: {value: 'ap'}});
        var dropDownComp = getChildComponent(Dropdown)[0];
        var props = dropDownComp.props;
        props.onSelected('apple');

        // Assert
        expect(onSelected).toBeCalled();
        expect(onSelected.mock.calls[0][0]).toBe('apple');
    });

    it('should notify caller as part of form submit', () => {
        // Arrange
        var formNode = getChildNodeOfType('form');
        var inputNode = getChildNodeOfType('input');
        TestUtils.Simulate.change(inputNode, {target: {value: 'apple'}});

        // Act
        TestUtils.Simulate.submit(formNode);

        // Assert
        expect(onSelected.mock.calls[0][0]).toBe('apple');
    });

    it('should NOT open dropdown if input does not match any tags', () => {
        // Act
        var inputNode = getChildNodeOfType('input');
        TestUtils.Simulate.change(inputNode, {target: {value: 'zz'}});

        // Assert
        var dropDownComp = getChildComponent(Dropdown);
        expect(dropDownComp.length).toBe(0);

    });

});

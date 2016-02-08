/*eslint no-unused-vars: 0*/
jest.dontMock('underscore');
jest.dontMock('../OptionSelector');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const OptionSelector = require('../OptionSelector');

describe('OptionSelector tests', () => {

    var component, domElem;
    var label, options, onSelected, defaultValue, selectEvent;

    var createComponent= (label, options, onSelected, defaultValue) => {
        component = TestUtils.renderIntoDocument(
            <OptionSelector
                label={label}
                options={options}
                onChange={onSelected}
                defaultValue={defaultValue} />
        );

        domElem = ReactDOM.findDOMNode(component);
    };

    var getChildComponent = (child) => {
        return TestUtils.findRenderedComponentWithType(component, child);
    };

    var getChildNodeOfType = (type) => {
        return TestUtils.findRenderedDOMComponentWithTag( component, type);
    };


    beforeEach(() => {

        label = 'Select Salary Range';
        options = [
            {display:'Option1', value: 'Opt1Val'},
            {display:'Option2', value: 'Opt2Val'},
            {display:'Option3', value: 'Opt3Val'}
        ];
        onSelected = jest.genMockFunction();
        defaultValue = 'Opt2Val';

        createComponent(label, options, onSelected, defaultValue);
        
    });

    it('should render the label', () => {
        var labelNode = getChildNodeOfType('label');
        expect(labelNode.textContent).toBe(label);
    });

    it('should render with right number of option nodes', () => {
        var selectNode = getChildNodeOfType('select');
        expect(selectNode.childNodes.length).toBe(3);
    });

    it('should invoke onChange when an option is selected', () => {
        // Arrange
        var selectNode = getChildNodeOfType('select');
        var optionNode = selectNode.childNodes[1];

        // Act
        TestUtils.Simulate.change(selectNode, {target: {value: 'Opt2Val'}});

        // Assert
        expect(onSelected).toBeCalled();
    });

});

/*eslint no-unused-vars: 0*/
jest.dontMock('underscore');
jest.dontMock('../Filter');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Filter = require('../Filter');
import OptionSelector from '../../utils/OptionSelector';

describe('Filter tests', () => {

    var component, domElem;
    var label, options, onFilter, defaultValue, selectEvent;

    var createComponent= (label, options, onFilter, defaultValue) => {
        component = TestUtils.renderIntoDocument(
            <Filter
                label={label}
                options={options}
                onFilter={onFilter}
                defaultValue={defaultValue} />
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

        label = 'Select Salary Range';
        options = [
            {display:'Option1', value: 'Opt1Val'},
            {display:'Option2', value: 'Opt2Val'},
            {display:'Option3', value: 'Opt3Val'}
        ];
        onFilter = jest.genMockFunction();
        defaultValue = 'Opt2Val';

        createComponent(label, options, onFilter, defaultValue);
        
    });

    it('should pass in the props to the OptionSelector component', () => {
        // Arrange
        var optionSelector = getChildComponent(OptionSelector)[0];

        // Act
        var props = optionSelector.props;

        // Assert
        expect(props.label).toBe(label);
        expect(props.options).toEqual(options);
        expect(props.defaultValue).toBe(defaultValue);
    });

    it('should pass default value as "clear" if none is passed', () => {
        // Arrange
        defaultValue = undefined;

        // Act
        createComponent(label, options, onFilter, defaultValue);
        var optionSelector = getChildComponent(OptionSelector)[0];

        // Assert
        var props = optionSelector.props;
        expect(props.defaultValue).toBe('clear');

    });

    it('should invoke the caller when filter changed', () => {
        var optionSelector = getChildComponent(OptionSelector)[0];
        var onChange = optionSelector.props.onChange;
        
        onChange({target: {value: 'Opt2Val'}});

        expect(onFilter).toBeCalled();

    });

});


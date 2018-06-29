import React from 'react';
import { shallow } from 'enzyme';
import Step1 from '../Step1';
jest.mock('../../utils/tracking.js', () => () => {});

it('should render', () => {
  const wrapper = shallow(<Step1 />);

  expect(wrapper).toHaveLength(1);
});

it('should have a displayName', () => {
  expect(Step1.displayName).toBe('Step1');
});
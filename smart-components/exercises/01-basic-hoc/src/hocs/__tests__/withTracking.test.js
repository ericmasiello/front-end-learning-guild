import React from 'react';
import { shallow, mount } from 'enzyme';
import withTracking from '../withTracking';
jest.mock('../../utils/tracking');

test('should render the component', () => {
  const Test = () => <div />;
  const TestWithTracking = withTracking()(Test);
  const wrapper = shallow(<TestWithTracking />);

  expect(wrapper.text()).toBe('<Test />');
})

test('should track an event', () => {
  const mockTracker = jest.fn();
  const Test = () => <div />;
  const TestWithTracking = withTracking({ tracker: mockTracker })(Test);
  const wrapper = shallow(<TestWithTracking />);

  expect(mockTracker).toBeCalled();
});

test('should track an event name', () => {
  const mockTracker = jest.fn();
  const Test = () => <div />;
  const TestWithTracking = withTracking({ tracker: mockTracker, event: 'The Event' })(Test);
  const wrapper = shallow(<TestWithTracking />);

  expect(mockTracker).toBeCalledWith('The Event');
});

test('should pass down props to wrapped component', () => {
  const Test = () => <div />;
  const TestWithTracking = withTracking()(Test);
  const wrapper = shallow(<TestWithTracking foo="foo1" bar="bar1" />);

  expect(wrapper.props().foo).toBe('foo1');
  expect(wrapper.props().bar).toBe('bar1');
});

test('should set the displayName', () => {
  const Test = () => <div />;
  Test.displayName = 'TheTestComponent';
  const TestWithTracking = withTracking()(Test);
  
  expect(TestWithTracking.displayName).toBe('withTracking(TheTestComponent)');
});

test('should hoist static methods', () => {
  const Test = () => <div />;
  const mockMethod = jest.fn();
  Test.someStaticMethod = mockMethod;
  const TestWithTracking = withTracking()(Test);

  TestWithTracking.someStaticMethod();
  expect(mockMethod).toBeCalled();
});

test('should pass innerRef to ref', () => {
  class Input extends React.Component {
    render() {
      const { load, save, remove, innerRef, ...rest } = this.props;
      return <input {...rest} ref={(elm) => this.elm = elm} />;
    } 
  }

  const InputWithStorage = withTracking()(Input);

  class Test extends React.Component {
    inputElm = null;
    setRef = (elm) => {
      this.inputElm = elm
    };
    render() {
      return (
        <div>
          <InputWithStorage innerRef={this.setRef} />
        </div>
      );
    }
  }

  const wrapper = mount(<Test />);

  expect(wrapper.instance().inputElm).toBeDefined();
});

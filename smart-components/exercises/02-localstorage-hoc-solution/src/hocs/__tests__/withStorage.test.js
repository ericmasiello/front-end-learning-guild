import React from 'react';
import { shallow, mount } from 'enzyme';
import withStorage from '../withStorage';

let store;
let getItemMock;
let setItemMock;
let removeItemMock;

beforeAll(() => {
  store = {};
  getItemMock = jest.fn((key) => store[key] || null);
  setItemMock = jest.fn((key, value) => store[key] = value.toString());
  removeItemMock = jest.fn((key) => delete store[key]);

  const localStorageMock = {
    getItem: getItemMock,
    setItem: setItemMock,
    removeItem: removeItemMock,
  };
  
  Object.defineProperty(window, 'localStorage', {
     value: localStorageMock
  });
});

test('should render the component', () => {
  const Test = () => <div />;
  const TestWithStorage = withStorage(Test);
  const wrapper = shallow(<TestWithStorage />);

  expect(wrapper.text()).toBe('<Test />');
});

test('should allow loading data from localStorage', () => {
  const Test = () => <div />;
  const TestWithStorage = withStorage(Test);
  const wrapper = shallow(<TestWithStorage />);

  wrapper.props().load('key');
  expect(getItemMock).toBeCalledWith('key');
});

test('should allow saving data to localStorage', () => {
  const Test = () => <div />;
  const TestWithStorage = withStorage(Test);
  const wrapper = shallow(<TestWithStorage />);

  wrapper.props().save('key', 'value');
  expect(setItemMock).toBeCalledWith('key', 'value');
});

test('should allow removing data from localStorage', () => {
  const Test = () => <div />;
  const TestWithStorage = withStorage(Test);
  const wrapper = shallow(<TestWithStorage />);

  wrapper.props().remove('key');
  expect(removeItemMock).toBeCalledWith('key');
});

test('should pass down props to wrapped component', () => {
  const Test = () => <div />;
  const TestWithStorage = withStorage(Test);
  const wrapper = shallow(<TestWithStorage foo="foo1" bar="bar1" />);

  expect(wrapper.props().foo).toBe('foo1');
  expect(wrapper.props().bar).toBe('bar1');
});

test('should set the displayName', () => {
  const Test = () => <div />;
  Test.displayName = 'TheTestComponent';
  const TestWithStorage = withStorage(Test);
  
  expect(TestWithStorage.displayName).toBe('withStorage(TheTestComponent)');
});

test('should hoist static methods', () => {
  const Test = () => <div />;
  const mockMethod = jest.fn();
  Test.someStaticMethod = mockMethod;
  const TestWithStorage = withStorage(Test);

  TestWithStorage.someStaticMethod();
  expect(mockMethod).toBeCalled();
});

test('should pass innerRef to ref', () => {
  class Input extends React.Component {
    render() {
      const { load, save, remove, innerRef, ...rest } = this.props;
      return <input {...rest} ref={(elm) => this.elm = elm} />;
    } 
  }

  const InputWithStorage = withStorage(Input);

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

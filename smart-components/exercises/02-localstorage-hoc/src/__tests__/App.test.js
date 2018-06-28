import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

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

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

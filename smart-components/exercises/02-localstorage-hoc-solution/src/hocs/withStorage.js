import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

/*
  Notes on how to use localStorage

  All calls are synchronous (i.e. no promises or callbacks required)

  Load Data:
  localStorage.getItem('some-key')

  Save Data:
  localStorage.setItem('some-key', 'new value');

  Remove Data:
  localStorage.removeItem('some-key');
*/

const withStorage = (Component) => {
  class Wrapper extends React.Component {

    load(key) {
      return localStorage.getItem(key); 
    }
    
    save(key, data) {
      localStorage.setItem(key, data);
    }
    
    remove(key) {
      localStorage.removeItem(key);
    }
    
    render() {
      return (
        <Component
          load={this.load}
          save={this.save}
          remove={this.remove}
          {...this.props}
        />
      );
    }
  }

  Wrapper.displayName = `withStorage(${Component.displayName || Component.name})`;

  hoistNonReactStatic(Wrapper, Component);

  return Wrapper;
}

export default withStorage;

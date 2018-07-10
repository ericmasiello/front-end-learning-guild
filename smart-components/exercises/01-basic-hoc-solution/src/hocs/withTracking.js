import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import tracking from '../utils/tracking';

const defaultConfig = {
  tracker: tracking,
  event: '',
};

const withTracking = ({ tracker = tracking, event = '' } = defaultConfig) => (Component) => {
  class Wrapper extends React.Component {
    componentDidMount() {
      tracker(event);
    }
    render() {
      const { innerRef, ...rest } = this.props;
      return <Component ref={innerRef} {...rest} />;
    }
  }

  Wrapper.displayName = `withTracking(${Component.displayName || Component.name})`;

  hoistNonReactStatic(Wrapper, Component);

  return Wrapper;
}

export default withTracking;

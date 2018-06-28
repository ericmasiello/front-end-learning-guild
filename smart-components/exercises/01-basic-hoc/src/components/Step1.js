import React, { Component } from 'react';
import tracking from '../utils/tracking';

class Step1 extends Component {
  static displayName = 'Step1';
  componentDidMount() {
    tracking('Step 1');
  }
  render() {
    return (
      <div className="step-1">
        Step 1
      </div>
    );
  }
}

export default Step1;

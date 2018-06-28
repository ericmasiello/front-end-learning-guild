import React from 'react';
import withTracking from '../hocs/withTracking';

export const Step2 = (props) => (
  <div className="step-2" {...props}>
    Step 2
  </div>
);

Step2.displayName = 'Step2';

const Step2WithTracking = withTracking({ event: 'Step 2' })(Step2);

export default Step2WithTracking;

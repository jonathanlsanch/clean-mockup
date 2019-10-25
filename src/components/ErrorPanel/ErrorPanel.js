import React from 'react';
import { ErrorWrapper } from './elements';

export default props => (
  <ErrorWrapper>
    <span role="img" aria-label="Error">
      😱
    </span>{' '}
    Error!
  </ErrorWrapper>
);

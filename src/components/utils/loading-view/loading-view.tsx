import * as React from 'react';
import { Alert } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';

import Spinner from 'components/utils/spinner';

interface Props {
  status:      string;
  error?:      string;
  onTryAgain?: () => void;
}

const LoadingView: React.SFC<Props> = ({status, error, onTryAgain, children}) => {
  let body: React.ReactNode = null;

  switch (status) {
    case statuses.FAILURE:
      body = (
        <Alert bsStyle="danger">
          { error || 'Error on data loading.' }
          { ' ' }
          { onTryAgain && <a href="" onClick={ (e) => { e.preventDefault(); onTryAgain(); } }>Try again</a> }
        </Alert>
      );
      break;
    case statuses.SUCCESS:
      body = children;
      break;
    default:
      body = <Spinner />;
  }

  return (
    <div>
      { body }
    </div>
  );
};

LoadingView.defaultProps = {
  error: 'Error on data loading.'
};

export default LoadingView;

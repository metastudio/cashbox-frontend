import * as React from 'react';
import { Alert } from 'react-bootstrap';

import { Status } from 'model-types';

import Spinner from 'components/utils/spinner';

interface IProps {
  status:      Status;
  error?:      string;
  onTryAgain?: () => void;
  children?:   React.ReactNode | ((status?: Status) => React.ReactNode);
}

const LoadingView: React.SFC<IProps> = ({ status, error, onTryAgain, children }) => {
  let body: React.ReactNode = null;

  switch (status) {
    case Status.Failure:
      body = (
        <Alert bsStyle="danger">
          { error || 'Error on data loading.' }
          { ' ' }
          { onTryAgain && <a href="" onClick={ (e) => { e.preventDefault(); onTryAgain(); } }>Try again</a> }
        </Alert>
      );
      break;
    case Status.Success:
      if (typeof children === 'function') {
        body = children(status);
      } else {
        body = children;
      }
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
  error: 'Error on data loading.',
};

export default LoadingView;

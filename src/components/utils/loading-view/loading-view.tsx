import * as React from 'react';
import { Alert } from 'react-bootstrap';

import { Status } from 'model-types';

import Spinner from 'components/utils/spinner';

interface IProps {
  status:      Status;
  error?:      string;
  onTryAgain?: () => void;
  children?:   React.ReactNode | ((status?: Status) => React.ReactNode);
  spinner?:    React.ReactNode | (() => React.ReactNode);
}

class LoadingView extends React.Component<IProps> {
  public static defaultProps = {
    error: 'Error on data loading.',
  };

  private handleTryAgain = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.props.onTryAgain && this.props.onTryAgain();
  }

  private renderError = () => {
    const { error, onTryAgain } = this.props;
    return (
      <Alert bsStyle="danger">
        { error || 'Error on data loading.' }
        { ' ' }
        { onTryAgain && <a href="" onClick={ this.handleTryAgain }>Try again</a> }
      </Alert>
    );
  }

  private renderChildren = () => {
    const { children, status } = this.props;

    if (children instanceof Function) { return children(status); }

    return children;
  }

  private renderSpinner = () => {
    const { spinner } = this.props;

    if (spinner && spinner instanceof Function) {
      return spinner();
    }

    return spinner || <Spinner />;
  }

  public render() {
    const { status } = this.props;

    switch (status) {
      case Status.Failure:
        return this.renderError();
      case Status.Success:
        return this.renderChildren();
      default:
        return this.renderSpinner();
    }
  }
}

export default LoadingView;

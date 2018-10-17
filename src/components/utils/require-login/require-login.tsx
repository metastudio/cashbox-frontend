import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { selectIsAuthorized } from 'services/auth';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';

interface IStateProps {
  isAuthorized: boolean;
}

interface IDispatchProps {
  showMessage: typeof addFlashMessage;
}

type IProps = RouteComponentProps<{}> & IStateProps & IDispatchProps;

class RequireLogin extends React.Component<IProps> {
  private checkAuth(props: IProps) {
    if (!props.isAuthorized) {
      props.showMessage('Login is required.', { type: 'danger' });
      props.history.push('/login');
      return;
    }
  }

  public componentDidMount() {
    this.checkAuth(this.props);
  }

  public componentDidUpdate() {
    this.checkAuth(this.props);
  }

  public render() {
    const { isAuthorized, children } = this.props;

    if (!isAuthorized) { return null; }

    return children;
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  isAuthorized: selectIsAuthorized(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  showMessage: (msg, opts) => dispatch(addFlashMessage(msg, opts)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(RequireLogin));

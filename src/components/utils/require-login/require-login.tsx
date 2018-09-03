import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { selectIsAuthorized } from 'services/auth';
import { addFlashMessage, IFlashMessageOptions } from 'services/flash-messages';

interface IStateProps {
  isAuthorized: boolean;
}

interface IDispatchProps {
  flashMessage: (msg: string, opts?: IFlashMessageOptions) => void;
}

type IProps = RouteComponentProps<{}> & IStateProps & IDispatchProps;

class RequireLogin extends React.Component<IProps> {
  private checkAuth(props: IProps) {
    if (!props.isAuthorized) {
      props.flashMessage('Login is required.', { type: 'danger' });
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

const mapState = (state: object) => ({
  isAuthorized: selectIsAuthorized(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  flashMessage: (msg: string, opts: IFlashMessageOptions) => dispatch(addFlashMessage(msg, opts)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(RequireLogin));

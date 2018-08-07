import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { addFlashMessage, FlashMessageOptions } from 'services/flash-messages';
import { selectIsAuthorized } from 'services/auth';

interface StateProps {
  isAuthorized: boolean;
}

interface DispatchProps {
  flashMessage: (msg: string, opts?: FlashMessageOptions) => void;
}

type Props = RouteComponentProps<{}> & StateProps & DispatchProps;

class RequireLogin extends React.Component<Props> {
  checkAuth(props: Props) {
    if (!props.isAuthorized) {
      props.flashMessage('Login is required.', { type: 'danger' });
      props.history.push('/login');
      return;
    }
  }

  componentDidMount() {
    this.checkAuth(this.props);
  }

  componentDidUpdate() {
    this.checkAuth(this.props);
  }

  render() {
    if (this.props.isAuthorized) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

const mapState = (state: object) => ({
  isAuthorized: selectIsAuthorized(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  flashMessage: (msg: String, opts: FlashMessageOptions) => dispatch(addFlashMessage(msg, opts)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(RequireLogin));

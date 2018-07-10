import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { FlashMessageOptions } from 'model-types';
import { addFlashMessage } from 'actions/flash-messages.js';
import { selectIsAuthorized } from 'selectors/auth.js';

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

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  flashMessage: (msg: String, opts: FlashMessageOptions) => dispatch(addFlashMessage(msg, opts)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(RequireLogin));

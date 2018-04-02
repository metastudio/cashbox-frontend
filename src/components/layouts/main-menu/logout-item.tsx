import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { MenuItem } from 'react-bootstrap';

import { addFlashMessage } from 'actions/flash-messages.js';
import { logoutUser } from 'actions/auth.js';
import { selectIsAuthorized } from 'selectors/auth.js';

interface StateProps {
  isAuthorized?: boolean;
}

interface DispatchProps {
  logout:      () => Promise<{}>;
  showMessage: (message: string) => void;
}

class LogoutItem extends React.Component<StateProps & DispatchProps> {
  handleClick = (e: React.MouseEvent<MenuItem>) => {
    e.preventDefault();

    const { logout, showMessage } = this.props;

    logout().then(() => {
      showMessage('You successfully signed out.');
    });
  }

  render() {
    if (!this.props.isAuthorized) {
      return <Redirect to="/" />;
    } else {
      return(
        <MenuItem onClick={ this.handleClick } rel="nofollow">
          Sign out
        </MenuItem>
      );
    }
  }
}

const mapState = (state: object) => ({
  isAuthorized: selectIsAuthorized(state),
});

const mapDispatch = (dispatch: Dispatch<void>) => ({
  logout:      () => new Promise((res, rej) => dispatch(logoutUser(res, rej))),
  showMessage: (message: string) => dispatch(addFlashMessage(message)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(LogoutItem);

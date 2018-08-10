import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { MenuItem } from 'react-bootstrap';

import { addFlashMessage } from 'services/flash-messages';
import { logoutUser, selectIsAuthorized } from 'services/auth';

interface IStateProps {
  isAuthorized?: boolean;
}

interface IDispatchProps {
  logout:      () => Promise<{}>;
  showMessage: (message: string) => void;
}

class LogoutItem extends React.Component<IStateProps & IDispatchProps> {
  private handleClick = (e: React.MouseEvent<MenuItem>) => {
    e.preventDefault();

    const { logout, showMessage } = this.props;

    logout().then(() => {
      showMessage('You successfully signed out.');
    });
  }

  public render() {
    if (!this.props.isAuthorized) {
      return <Redirect to="/" />;
    }

    return(
      <MenuItem onClick={ this.handleClick } rel="nofollow">
        Sign out
      </MenuItem>
    );
  }
}

const mapState = (state: object) => ({
  isAuthorized: selectIsAuthorized(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  logout:      () => new Promise((res, rej) => dispatch(logoutUser(res, rej))),
  showMessage: (message: string) => dispatch(addFlashMessage(message)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(LogoutItem);

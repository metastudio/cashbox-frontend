import * as React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';

import { MenuItem } from 'react-bootstrap';

import { logoutUser, selectIsAuthorized } from 'services/auth';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';

interface IStateProps {
  isAuthorized?: boolean;
}

interface IDispatchProps {
  logout:      typeof logoutUser.request;
  showMessage: typeof addFlashMessage;
}

class LogoutItem extends React.Component<IStateProps & IDispatchProps> {
  private handleClick = (e: React.MouseEvent<MenuItem>) => {
    e.preventDefault();

    const { logout, showMessage } = this.props;

    new Promise((resolve, reject) => {
      logout(resolve, reject);
    }).then(() => {
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

const mapState = (state: IGlobalState): IStateProps => ({
  isAuthorized: selectIsAuthorized(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  logout:      (res, rej) => dispatch(logoutUser.request(res, rej)),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(LogoutItem);

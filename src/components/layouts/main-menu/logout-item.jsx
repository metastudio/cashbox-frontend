import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { MenuItem } from 'react-bootstrap';

import { addFlashMessage } from 'actions/flash-messages.js';
import { logoutUser } from 'actions/auth.js';

class LogoutItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.logout().then(() => {
      this.props.addFlashMessage('You successfully signed out.');
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

LogoutItem.propTypes = {
  isAuthorized:    PropTypes.bool,
  logout:          PropTypes.func.isRequired,
  afterLogout:     PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
};

const select = (state) => ({
  isAuthorized: !!state.auth.token,
});

const dispatcher = (dispatch) => ({
  logout:          () => new Promise((res, rej) => dispatch(logoutUser(res, rej))),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default connect(select, dispatcher)(LogoutItem);

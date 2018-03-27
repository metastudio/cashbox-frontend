import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import LogoutItem from './logout-item.jsx';
import { selectUserFullName } from 'selectors/users.js';

const ProfileItem = ({ userFullName }) => (
  <NavDropdown title={ userFullName } id="user_links">
    <LinkContainer to="/user/profile">
      <MenuItem>Edit profile</MenuItem>
    </LinkContainer>
    <LogoutItem />
  </NavDropdown>
);

ProfileItem.propTypes = {
  userFullName: PropTypes.string
};

const select = (state) => ({
  userFullName: selectUserFullName(state),
});

export default connect(select)(ProfileItem);

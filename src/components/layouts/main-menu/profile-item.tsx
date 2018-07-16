import * as React from 'react';
import { connect } from 'react-redux';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import LogoutItem from './logout-item';
import { selectUserFullName } from 'services/users';

interface StatePropTypes {
  userFullName: string;
}

const ProfileItem: React.SFC<StatePropTypes> = ({ userFullName }) => (
  <NavDropdown title={ userFullName } id="user_links">
    <LinkContainer exact to="/organizations/select">
      <MenuItem>Change organization</MenuItem>
    </LinkContainer>
    <LinkContainer exact to="/organizations">
      <MenuItem>Manage organizations</MenuItem>
    </LinkContainer>
    <LinkContainer to="/user/profile">
      <MenuItem>Edit profile</MenuItem>
    </LinkContainer>
    <LogoutItem />
  </NavDropdown>
);

const select = (state: object) => ({
  userFullName: selectUserFullName(state),
});

export default connect<StatePropTypes>(select)(ProfileItem);

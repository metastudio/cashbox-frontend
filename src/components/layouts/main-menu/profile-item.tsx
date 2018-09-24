import * as React from 'react';

import { MenuItem, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import { selectUserFullName } from 'services/users';

import LogoutItem from './logout-item';

interface IStateProps {
  userFullName: string;
}

const ProfileItem: React.SFC<IStateProps> = ({ userFullName }) => (
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
    <MenuItem divider />
    <LogoutItem />
  </NavDropdown>
);

const select = (state: object) => ({
  userFullName: selectUserFullName(state),
});

export default connect<IStateProps>(select)(ProfileItem);

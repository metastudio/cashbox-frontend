import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import Balances from 'components/balances/balances.jsx';
import ProfileItem from './profile-item.jsx';

class MainMenu extends React.Component {

  render() {

    const organizationItems = () => {
      if (this.props.currentOrganization) {
        return (
          <Nav>
            <NavDropdown title={this.props.currentOrganization.name} id="organizations-nav-dropdown">
              <LinkContainer to="/organizations/select">
                <MenuItem>Select</MenuItem>
              </LinkContainer>
              <LinkContainer to="/customers">
                <NavItem>Customers</NavItem>
              </LinkContainer>
              <LinkContainer to="/categories">
                <NavItem>Categories</NavItem>
              </LinkContainer>
              <LinkContainer to="/bank_accounts">
                <NavItem>Bank accounts</NavItem>
              </LinkContainer>
              <LinkContainer to="/members">
                <NavItem>Members</NavItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        );
      } else {
        return (
          <Nav>
            <NavDropdown title="Organizations" id="organizations-nav-dropdown">
              <LinkContainer to="/organizations/select">
                <MenuItem>Select</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        );
      }
    };

    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/" exact>Cashbox</NavLink>
          </Navbar.Brand>
        </Navbar.Header>

        <Nav>
          <LinkContainer to="/" exact>
            <NavItem>Dashboard</NavItem>
          </LinkContainer>
        </Nav>

        { organizationItems() }

        <Nav>
          <Balances />
        </Nav>

        <Nav pullRight>
          <ProfileItem />
        </Nav>
      </Navbar>
    );
  }
}

MainMenu.propTypes = {
  currentOrganization: PropTypes.object,
};

const select = (state) => ({
  currentOrganization: state.currentOrganization.data
});

export default connect(select, null)(MainMenu);

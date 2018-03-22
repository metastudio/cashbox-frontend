import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

import Balances from 'components/balances/balances.jsx'
import ProfileItem from './profile-item.jsx'

class MainMenu extends Component {

  render() {

    const organizationItems = () => {
      if (this.props.currentOrganization) {
        return (
          <Nav>
            <NavDropdown title={this.props.currentOrganization.name} id="organizations-nav-dropdown">
              <LinkContainer to="/organizations/select" onlyActiveOnIndex>
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
        )
      } else {
        return (
          <Nav>
            <NavDropdown title="Organizations" id="organizations-nav-dropdown">
              <LinkContainer to="/organizations/select" onlyActiveOnIndex>
                <MenuItem>Select</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        )
      }
    }

    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" onlyActiveOnIndex>Cashbox</Link>
          </Navbar.Brand>
        </Navbar.Header>

        <Nav>
          <LinkContainer to="/" onlyActiveOnIndex>
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
    )
  }
}

MainMenu.propTypes = {
  currentOrganization: PropTypes.object,
}

const select = (state) => ({
  currentOrganization: state.currentOrganization.data
})

export default connect(select, null)(MainMenu)

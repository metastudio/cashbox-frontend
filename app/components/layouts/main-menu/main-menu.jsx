import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

import Balances from 'components/balances/balances.jsx'
import ProfileItem from './profile-item.jsx'

const MainMenu = () => (
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

    <Nav>
      <NavDropdown title="Organizations" id="organizations-nav-dropdown">
        <LinkContainer to="/organizations/select" onlyActiveOnIndex>
          <MenuItem>Select</MenuItem>
        </LinkContainer>
      </NavDropdown>
    </Nav>

    <Nav>
      <Balances />
    </Nav>

    <Nav pullRight>
      <ProfileItem />
    </Nav>

    <Nav pullRight>
      <LinkContainer to="/invoices" onlyActiveOnIndex>
        <NavItem >
          Invoices
        </NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
)

export default MainMenu

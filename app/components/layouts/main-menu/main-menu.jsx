import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

import LogoutItem from './logout-item.jsx'
import BankAccountsItem from './bank-accounts-item.jsx'

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
        <BankAccountsItem />
      </NavDropdown>
    </Nav>

    <Nav pullRight>
      { /* TODO show organization name */ }
    </Nav>

    <Nav pullRight>
      <LogoutItem />
    </Nav>
  </Navbar>
)

export default MainMenu

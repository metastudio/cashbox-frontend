import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import LogoutItem from './logout-item.jsx'

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

    <Nav pullRight>
      <LogoutItem />
    </Nav>
  </Navbar>
)

export default MainMenu

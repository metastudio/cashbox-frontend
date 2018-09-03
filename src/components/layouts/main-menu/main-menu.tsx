import * as React from 'react';

import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Balances from './balances';
import Invoices from './invoices';
import OrganizationItem from './organization-item';
import ProfileItem from './profile-item';

const MainMenu = () => (
  <Navbar inverse fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <NavLink to="/" exact>CashBox</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <OrganizationItem />
        <Balances />
      </Nav>

      <Nav pullRight>
        <Invoices />
        <ProfileItem />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default MainMenu;

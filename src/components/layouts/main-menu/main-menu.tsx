import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import Balances from './balances';
import OrganizationItem from './organization-item';
import ProfileItem from './profile-item';
import Invoices from './invoices';

const MainMenu = () => (
  <Navbar inverse fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <NavLink to="/" exact>CashBox</NavLink>
      </Navbar.Brand>
    </Navbar.Header>

    <OrganizationItem />

    <Nav>
      <Balances />
    </Nav>

    <Nav pullRight>
      <ProfileItem />
    </Nav>

    <Nav pullRight>
      <Invoices />
    </Nav>
  </Navbar>
);

export default MainMenu;

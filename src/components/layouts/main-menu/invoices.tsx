import * as React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem } from 'react-bootstrap';

const Invoices: React.SFC = () => (
  <LinkContainer to="/invoices">
    <NavItem >
      Invoices
    </NavItem>
  </LinkContainer>
);

export { Invoices as default };

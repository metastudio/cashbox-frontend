import * as React from 'react';

import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Invoices: React.SFC = () => (
  <LinkContainer to="/invoices">
    <NavItem >
      Invoices
    </NavItem>
  </LinkContainer>
);

export { Invoices as default };

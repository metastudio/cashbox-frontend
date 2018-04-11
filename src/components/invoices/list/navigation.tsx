import * as React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

import UnpaidCountBadge from './unpaid-count-badge';

const Navigation: React.SFC<{}> = () => (
  <Nav bsStyle="tabs">
    <IndexLinkContainer to={ '/invoices' }>
      <NavItem>Ivoices</NavItem>
    </IndexLinkContainer>
    <IndexLinkContainer to={ '/invoices/unpaid' }>
      <NavItem>Unpaid <UnpaidCountBadge /></NavItem>
    </IndexLinkContainer>
  </Nav>
);

export default Navigation;

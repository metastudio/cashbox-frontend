import * as React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

interface Props {
  unpaidCount: number;
  activeKey?: string | number;
}

const Navigation: React.SFC<Props> = ({ unpaidCount, activeKey }) => (
  <Nav bsStyle="tabs" activeKey={ activeKey } >
    <NavItem eventKey={ 1 } href="/invoices">
      Invoices
    </NavItem>
    <NavItem eventKey={ 2 } href="/invoices?q[unpaid]=true">
      { `Unpaid (${ unpaidCount })` }
    </NavItem>
  </Nav>
);

export default Navigation;

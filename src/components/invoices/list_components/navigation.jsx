import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem } from 'react-bootstrap';

export const Navigation = ({ unpaidCount, activeKey }) => (
  <Nav bsStyle="tabs" activeKey={ activeKey } >
    <NavItem eventKey={ 1 } href="/invoices">
      Invoices
    </NavItem>
    <NavItem eventKey={ 2 } href="/invoices?q[unpaid]=true">
      { `Unpaid (${ unpaidCount })` }
    </NavItem>
  </Nav>
)


Navigation.propTypes = {
  unpaidCount:  PropTypes.number,
  activeKey:    PropTypes.number
}


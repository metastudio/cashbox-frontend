import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'

export const Navigation = ({ unpaidCount, activeKey }) => (
  <Nav bsStyle="tabs" activeKey={ activeKey } >
    <NavItem eventKey={ 1 } href="/invoices/list">
      Invoices
    </NavItem>
    <NavItem eventKey={ 2 } href="/invoices/list?q[unpaid]=true">
      { `Unpaid (${ unpaidCount })` }
    </NavItem>
  </Nav>
)


Navigation.propTypes = {
  unpaidCount:  React.PropTypes.number,
  activeKey:    React.PropTypes.number
}


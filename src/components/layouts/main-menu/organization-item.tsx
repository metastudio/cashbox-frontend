import * as React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown } from 'react-bootstrap';

import { getCurrentOrganization } from 'selectors/organizations.js';
import 'components/app/css/default.css';

interface StatePropTypes {
  organization?: {
    name: string
  };
}

const MenuOrganizationItem: React.SFC<StatePropTypes> = ({ organization }) => {
  if (!organization) { return null; }

  const renderTitle = (title: string): object => {
    return (
      <>
        <span className="truncated">
          { title }
        </span>
        <div className="inline-caret">
          <span className="caret"/>
        </div>
      </>
    );
  };

  return (
    <Nav>
      <NavDropdown
        // @ts-ignore
        title={ renderTitle(organization.name) }
        noCaret="true"
        id="organizations-nav-dropdown"
      >
        <LinkContainer to="/customers">
          <NavItem>Customers</NavItem>
        </LinkContainer>
        <LinkContainer to="/bank_accounts">
          <NavItem>Bank accounts</NavItem>
        </LinkContainer>
        <LinkContainer to="/categories">
          <NavItem>Categories</NavItem>
        </LinkContainer>
        <LinkContainer to="/members">
          <NavItem>Members</NavItem>
        </LinkContainer>
      </NavDropdown>
    </Nav>
  );
};

const mapState = (state: object) => ({
  organization: getCurrentOrganization(state),
});

export default connect<StatePropTypes>(mapState)(MenuOrganizationItem);

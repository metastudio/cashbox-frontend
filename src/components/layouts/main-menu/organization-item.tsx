import * as React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown } from 'react-bootstrap';

import { selectCurrentOrganization } from 'services/organizations';
import 'components/app/css/default.css';

interface IStatePropTypes {
  organization?: {
    name: string,
  };
}

const MenuOrganizationItem: React.SFC<IStatePropTypes> = ({ organization }) => {
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
        noCaret
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
  organization: selectCurrentOrganization(state),
});

export default connect<IStatePropTypes>(mapState)(MenuOrganizationItem);

import * as React from 'react';

import { NavDropdown, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganization } from 'services/organizations';

import 'components/app/css/default.css';

interface IStatePropTypes {
  organization: {
    name: string,
  } | null;
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
  );
};

const mapState = (state: IGlobalState) => ({
  organization: selectCurrentOrganization(state),
});

export default connect<IStatePropTypes>(mapState)(MenuOrganizationItem);

import * as React from 'react';

import { Nav, NavItem, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { balanceStatisticPath, categoriesStatisticPath, customersStatisticPath } from 'routes';

const StatisticMenu: React.SFC = () => {
  return (
    <>
      <PageHeader>Charts</PageHeader>
      <Nav bsStyle="pills" stacked>
        <LinkContainer exact to={ balanceStatisticPath() }>
          <NavItem eventKey={ 1 }>
            Balance
          </NavItem>
        </LinkContainer>
        <LinkContainer exact to={ categoriesStatisticPath() }>
          <NavItem eventKey={ 1 }>
            Categories
          </NavItem>
        </LinkContainer>
        <LinkContainer exact to={ customersStatisticPath() }>
          <NavItem eventKey={ 1 }>
            Customers
          </NavItem>
        </LinkContainer>
      </Nav>
    </>
  );
};

export default StatisticMenu;

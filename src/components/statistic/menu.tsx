import * as React from 'react';

import { Nav, NavItem, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { balanceStatisticPath } from 'routes';

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
      </Nav>
    </>
  );
};

export default StatisticMenu;

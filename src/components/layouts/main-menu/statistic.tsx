import * as React from 'react';

import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { statisticPath } from 'routes';

const Statistics: React.SFC = () => (
  <LinkContainer to={ statisticPath() }>
    <NavItem >
      Statistic
    </NavItem>
  </LinkContainer>
);

export default Statistics;

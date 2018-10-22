import * as React from 'react';

import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { statisticsPath } from 'routes';

const Statistics: React.SFC = () => (
  <LinkContainer to={ statisticsPath() }>
    <NavItem >
      Statistics
    </NavItem>
  </LinkContainer>
);

export default Statistics;

import * as React from 'react';

import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Statistics: React.SFC = () => (
  <LinkContainer to="/statistics">
    <NavItem >
      Statistics
    </NavItem>
  </LinkContainer>
);

export default Statistics;

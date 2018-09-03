import * as React from 'react';

import { Col, Grid, Row } from 'react-bootstrap';

import MainMenu from 'components/layouts/main-menu';
import FlashMessages from 'components/utils/flash-messages';

const AppLayout: React.SFC<{}> = ({ children }) => (
  <div>
    <MainMenu />
    <Grid fluid>
      <Row>
        <Col xs={ 12 }>
          <FlashMessages />
          { children }
        </Col>
      </Row>
    </Grid>
  </div>
);

export default AppLayout;

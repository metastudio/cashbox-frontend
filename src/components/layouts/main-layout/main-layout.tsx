import * as React from 'react';

import { Grid, Col, Row } from 'react-bootstrap';

import MainMenu      from 'components/layouts/main-menu';
import Sidebar       from 'components/layouts/sidebar';
import FlashMessages from 'components/utils/flash-messages';

const MainLayout: React.SFC<{}> = ({ children }) => (
  <>
    <header>
      <MainMenu />
    </header>
    <Grid fluid>
      <Row>
        <Col xs={ 12 } md={ 8 }>
          <FlashMessages />
          { children }
        </Col>
        <Col xs={ 12 } md={ 4 }>
          <Sidebar />
        </Col>
      </Row>
    </Grid>
  </>
);

export default MainLayout;

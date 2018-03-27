import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Col, Row } from 'react-bootstrap';

import MainMenu      from 'components/layouts/main-menu';
import Sidebar       from 'components/layouts/sidebar';
import Footer        from 'components/layouts/footer';
import FlashMessages from 'components/utils/flash-messages';

const MainLayout = ({ children }) => (
  <div>
    <MainMenu />
    <Grid fluid>
      <Row>
        <Col xs={ 12 } md={ 8 }>
          <FlashMessages />
          { children }
        </Col>
        <Col xs={ 6 } md={ 4 }>
          <Sidebar />
        </Col>
      </Row>
    </Grid>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;

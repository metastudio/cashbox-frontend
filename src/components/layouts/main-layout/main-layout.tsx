import * as React from 'react';

import { Grid, Col, Row } from 'react-bootstrap';

import MainMenu      from 'components/layouts/main-menu';
import Sidebar       from 'components/layouts/sidebar';
import FlashMessages from 'components/utils/flash-messages';

interface Props {
  sidebar?: React.ReactNode;
}

const MainLayout: React.SFC<Props> = ({ children, sidebar }) => {
  const renderSidebar = () => {
    if (sidebar) { return sidebar; }
    return <Sidebar />;
  };

  return(
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
            { renderSidebar() }
          </Col>
        </Row>
      </Grid>
    </>
  );
};

export default MainLayout;

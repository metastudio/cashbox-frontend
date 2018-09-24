import * as React from 'react';

import { Breadcrumb as BootstrapBreadcrumb, Col, Grid, Row } from 'react-bootstrap';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import MainMenu      from 'components/layouts/main-menu';
import Sidebar       from 'components/layouts/sidebar';
import { CrumbItem } from 'components/utils/breadcrumbs';
import FlashMessages from 'components/utils/flash-messages';

interface IProps {
  sidebar?: () => React.ReactNode;
}

const MainLayout: React.SFC<IProps> = ({ children, sidebar }) => {
  const renderSidebar = () => {
    if (sidebar) { return sidebar(); }
    return <Sidebar />;
  };

  return(
    <>
      <header>
        <MainMenu />
      </header>
      <Grid fluid>
        <Row>
          <Col xs={ 12 }>
            <BreadcrumbsItem to={ '/' }>
              Home
            </BreadcrumbsItem>
            <Breadcrumbs
              item={ CrumbItem }
              container={ BootstrapBreadcrumb }
              finalProps={ { active: true } }
              duplicateProps={ { to: 'href' } }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 } sm={ 8 } md={ 9 }>
            <FlashMessages />
            { children }
          </Col>
          <Col xs={ 12 } sm={ 4 } md={ 3 }>
            { renderSidebar() }
          </Col>
        </Row>
      </Grid>
    </>
  );
};

export default MainLayout;

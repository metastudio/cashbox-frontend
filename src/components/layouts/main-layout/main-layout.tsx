import * as React from 'react';

import { Breadcrumb as BootstrapBreadcrumb, Col, Grid, Row } from 'react-bootstrap';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import MainMenu      from 'components/layouts/main-menu';
import Sidebar       from 'components/layouts/sidebar';
import { CrumbItem } from 'components/utils/breadcrumbs';
import FlashMessages from 'components/utils/flash-messages';

interface IProps {
  sidebar?: (() => React.ReactNode) | boolean;
}

const MainLayout: React.SFC<IProps> = ({ children, sidebar }) => {
  const showSidebar: boolean = sidebar !== false;

  let renderedSidebar = null;
  if (showSidebar) {
    if (typeof sidebar === 'function') {
      renderedSidebar = sidebar();
    } else {
      renderedSidebar = <Sidebar />;
    }
  }

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
          <Col xs={ 12 } sm={ showSidebar ? 8 : 12 } md={ showSidebar ? 9 : 12 }>
            <FlashMessages />
            { children }
          </Col>
          { showSidebar && <Col xs={ 12 } sm={ 4 } md={ 3 }>{ renderedSidebar }</Col> }
        </Row>
      </Grid>
    </>
  );
};

export default MainLayout;

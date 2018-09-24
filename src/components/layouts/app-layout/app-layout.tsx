import * as React from 'react';

import { Breadcrumb as BootstrapBreadcrumb, Col, Grid, Row } from 'react-bootstrap';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import MainMenu from 'components/layouts/main-menu';
import { CrumbItem } from 'components/utils/breadcrumbs';
import FlashMessages from 'components/utils/flash-messages';

const AppLayout: React.SFC<{}> = ({ children }) => (
  <div>
    <MainMenu />
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
        <Col xs={ 12 }>
          <FlashMessages />
          { children }
        </Col>
      </Row>
    </Grid>
  </div>
);

export default AppLayout;

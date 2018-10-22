import * as React from 'react';

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route, Switch } from 'react-router-dom';

import MainLayout from 'components/layouts/main-layout';
import { CurrentOrganizationProvider } from 'components/organizations/current-organization';
import RequireLogin from 'components/utils/require-login';

import Charts from './charts';

const StatisticsScene: React.SFC = () => (
  <RequireLogin>
    <CurrentOrganizationProvider>
      <MainLayout >
        <BreadcrumbsItem to={ '/statistics' }>
          Statistics
        </BreadcrumbsItem>
        <Switch>
          <Route exact path="/statistics" component={ Charts } />
        </Switch>
      </MainLayout>
    </CurrentOrganizationProvider>
  </RequireLogin>
);

export default StatisticsScene;

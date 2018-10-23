import * as React from 'react';

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route, Switch } from 'react-router-dom';

import { statisticPath } from 'routes';

import MainLayout from 'components/layouts/main-layout';
import { CurrentOrganizationProvider } from 'components/organizations/current-organization';
import asyncComponent from 'components/utils/async-component';
import RequireLogin from 'components/utils/require-login';

const AsyncCharts = asyncComponent(() => import('./charts'));

const StatisticScene: React.SFC = () => (
  <RequireLogin>
    <CurrentOrganizationProvider>
      <MainLayout >
        <BreadcrumbsItem to={ statisticPath() }>
          Statistic
        </BreadcrumbsItem>
        <Switch>
          <Route exact path={ String(statisticPath) } component={ AsyncCharts } />
        </Switch>
      </MainLayout>
    </CurrentOrganizationProvider>
  </RequireLogin>
);

export default StatisticScene;

import * as React from 'react';

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Redirect, Route, Switch } from 'react-router-dom';

import { balanceStatisticPath, statisticPath } from 'routes';

import MainLayout from 'components/layouts/main-layout';
import { CurrentOrganizationProvider } from 'components/organizations/current-organization';
import asyncComponent from 'components/utils/async-component';
import RequireLogin from 'components/utils/require-login';

import Menu from './menu';

const AsyncCharts = asyncComponent(() => import('./charts'));

const renderMenu = () => <Menu />;

const StatisticScene: React.SFC = () => (
  <RequireLogin>
    <CurrentOrganizationProvider>
      <MainLayout sidebar={ renderMenu }>
        <BreadcrumbsItem to={ statisticPath() }>
          Statistic
        </BreadcrumbsItem>
        <Switch>
          <Route exact path={ String(balanceStatisticPath) } component={ AsyncCharts } />
          <Redirect exact from={ String(statisticPath) } to={ balanceStatisticPath() } />
        </Switch>
      </MainLayout>
    </CurrentOrganizationProvider>
  </RequireLogin>
);

export default StatisticScene;

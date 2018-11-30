import * as React from 'react';

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  balanceStatisticPath,
  categoriesStatisticPath,
  customersStatisticPath,
  statisticPath,
} from 'routes';

import MainLayout from 'components/layouts/main-layout';
import { CurrentOrganizationProvider } from 'components/organizations/current-organization';
import RequireLogin from 'components/utils/require-login';
import Spinner from 'components/utils/spinner';

import Menu from './menu';

const Balance    = React.lazy(() => import('./balance/page'));
const Categories = React.lazy(() => import('./categories/page'));
const Customers  = React.lazy(() => import('./customers/page'));

const renderMenu = () => <Menu />;

const StatisticScene: React.SFC = () => (
  <RequireLogin>
    <CurrentOrganizationProvider>
      <MainLayout sidebar={ renderMenu }>
        <BreadcrumbsItem to={ statisticPath() }>
          Statistic
        </BreadcrumbsItem>
        <React.Suspense fallback={ <Spinner /> }>
          <Switch>
            <Route exact path={ String(balanceStatisticPath) } component={ Balance } />
            <Route exact path={ String(categoriesStatisticPath) } component={ Categories } />
            <Route exact path={ String(customersStatisticPath) } component={ Customers } />
            <Redirect exact from={ String(statisticPath) } to={ balanceStatisticPath() } />
          </Switch>
        </React.Suspense>
      </MainLayout>
    </CurrentOrganizationProvider>
  </RequireLogin>
);

export default StatisticScene;

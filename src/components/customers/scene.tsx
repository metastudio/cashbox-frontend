import * as React from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route, Switch } from 'react-router-dom';

import AppLayout from 'components/layouts/app-layout';
import RequireOrganization from 'components/require-organization';
import RequireLogin from 'components/utils/require-login';

import Edit from './edit';
import List from './list';
import New  from './new';

const CustomersScene: React.SFC<{}> = () => (
  <RequireLogin>
    <RequireOrganization>
      <AppLayout>
        <BreadcrumbsItem to={ '/customers' }>
          Customers
        </BreadcrumbsItem>
        <Switch>
          <Route exact path="/customers" component={ List } />
          <Route path="/customers/new" component={ New } />
          <Route path="/customers/:id/edit" component={ Edit } />
        </Switch>
      </AppLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default CustomersScene;

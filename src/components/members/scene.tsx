import * as React from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route, Switch } from 'react-router-dom';

import AppLayout from 'components/layouts/app-layout';
import RequireOrganization from 'components/require-organization';
import RequireLogin from 'components/utils/require-login';

import List from './list';

const MembersScene: React.SFC = () => (
  <RequireLogin>
    <RequireOrganization>
      <AppLayout>
        <BreadcrumbsItem to={ '/members' }>
          Members
        </BreadcrumbsItem>
        <Switch>
          <Route path="/members" component={ List } />
        </Switch>
      </AppLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default MembersScene;

import * as React from 'react';

import { Route } from 'react-router-dom';

import AppLayout from 'components/layouts/app-layout';
import RequireOrganization from 'components/require-organization';
import RequireLogin from 'components/utils/require-login';

import Edit from './edit';
import List from './list';
import New  from './new';

const CategoriesScene: React.SFC<{}> = () => (
  <RequireLogin>
    <RequireOrganization>
      <AppLayout>
        <Route exact path="/categories" component={ List } />
        <Route path="/categories/new" component={ New } />
        <Route path="/categories/:id/edit" component={ Edit } />
      </AppLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default CategoriesScene;

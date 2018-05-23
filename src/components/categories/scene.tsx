import * as React from 'react';
import { Route } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import AppLayout from 'components/layouts/app-layout';

import List from './list';
import New  from './new.jsx';
import Edit from './edit';

const CategoriesScene: React.SFC<{}> = () => (
  <RequireLogin>
    <AppLayout>
      <Route exact path="/categories" component={ List } />
      <Route path="/categories/new" component={ New } />
      <Route path="/categories/:id/edit" component={ Edit } />
    </AppLayout>
  </RequireLogin>
);

export default CategoriesScene;

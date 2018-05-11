import * as React from 'react';
import { Route } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import AppLayout from 'components/layouts/app-layout';

import List from './list.jsx';
import New  from './new.jsx';
import Edit from './edit.jsx';

const CategoriesScene: React.SFC<{}> = () => (
  <RequireLogin>
    <AppLayout>
      <Route exact path="/categories" component={ List } />
      <Route path="/categories/new" component={ New } />
      <Route path="/categories/:categoryId/edit" component={ Edit } />
    </AppLayout>
  </RequireLogin>
);

export default CategoriesScene;

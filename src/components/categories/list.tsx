import * as React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';

import Categories from './list/categories';

const CategoriesList: React.SFC<{}> = () => (
  <div>
    <PageHeader>
      <Link to="/categories/new" className="btn btn-default pull-right">New Category</Link>
      Categories
    </PageHeader>
    <Categories />
  </div>
);

export default CategoriesList;

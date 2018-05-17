import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Categories from './list/categories';

class CategoriesList extends React.Component {
  render() {
    return (
      <div>
        <Link to="/categories/new" className="btn btn-default pull-right">New Category</Link>
        <h1>Categories</h1>
        <Categories />
      </div>
    );
  }
}

export default withRouter(CategoriesList);

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Customers from './list/customers';

class CustomersList extends React.Component {
  render() {
    return (
      <div>
        <Link to="/customers/new" className="btn btn-default pull-right">New Customer</Link>
        <h1>Customers</h1>
        <Customers />
      </div>
    );
  }
}

export default withRouter(CustomersList);

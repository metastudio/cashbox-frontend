import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';
import Customers from './list/customers';

const CustomersList = () => (
  <>
    <PageHeader>
      <Link to="/customers/new" className="btn btn-default pull-right">New Customer</Link>
      Customers
    </PageHeader>
    <Customers />
  </>
);

export default withRouter(CustomersList);

import * as React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';
import Customers from './list/customers';

const CustomersList = () => (
  <>
    <PageHeader>
      <Link to="/customers/new" className="btn btn-default pull-right">Add Customer...</Link>
      Customers
    </PageHeader>
    <Customers />
  </>
);

export default CustomersList;

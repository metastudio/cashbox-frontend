import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';
import DestroyButton from './destroy.jsx';

const CustomersTableRow = ({ customer }) => (
  <tr>
    <td>{ customer.name }</td>
    <td>{ customer.invoiceDetails }</td>
    <td><Link to={ `/customers/${customer.id}/edit` }><i className="fa fa-edit" /></Link></td>
    <td><DestroyButton customer={ customer } /></td>
  </tr>
);

export default withRouter(CustomersTableRow);

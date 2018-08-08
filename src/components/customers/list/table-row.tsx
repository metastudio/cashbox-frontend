import * as React from 'react';
import { Link } from 'react-router-dom';
import DestroyButton from '../destroy';
import { ICustomer } from 'services/customers';

interface IProps {
  customer: ICustomer;
}

const CustomersTableRow: React.SFC<IProps> = ({ customer }) => (
  <tr>
    <td>{ customer.name }</td>
    <td>{ customer.invoiceDetails }</td>
    <td>
      <Link to={ `/customers/${customer.id}/edit` }>
        <i className="fa fa-edit" />
      </Link>
    </td>
    <td><DestroyButton customer={ customer } /></td>
  </tr>
);

export default CustomersTableRow;

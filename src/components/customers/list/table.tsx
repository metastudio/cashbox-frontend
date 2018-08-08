import * as React from 'react';
import { Table } from 'react-bootstrap';

import { ICustomer } from 'services/customers';

import Row from './table-row';

interface IProps {
  customers: ICustomer[];
}

const CustomersTable: React.SFC<IProps> = ({ customers }) => (
  <Table striped responsive hover id="customers">
    <thead>
      <tr>
        <th>Name</th>
        <th>Invoice Details</th>
        <th colSpan={ 2 } />
      </tr>
    </thead>
    <tbody>
      { customers.map(c => <Row customer={ c } key={ c.id } />) }
    </tbody>
  </Table>
);

export default CustomersTable;

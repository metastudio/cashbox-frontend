import * as React from 'react';
import Row from './table-row.jsx';

const CustomersTableBody = ({ customers }) => (
  <tbody>
    { customers.map((c) => <Row customer={ c } key={ c.id } />) }
  </tbody>
);

export default CustomersTableBody;

import * as React from 'react';
import { Table } from 'react-bootstrap';

import { Category } from 'model-types';

import Row from './table-row';

interface Props {
  categories: Category[];
}

const CategoriesTable: React.SFC<Props> = ({ categories }) => (
  <Table striped responsive hover id="categories">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th colSpan={ 2 } />
      </tr>
    </thead>
    <tbody>
      { categories.map((c) => <Row category={ c } key={ c.id } />) }
  </tbody>
  </Table>
);

export default CategoriesTable;

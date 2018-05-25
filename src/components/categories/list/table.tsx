import * as React from 'react';
import { Table } from 'react-bootstrap';

import { CategoryFragment } from 'graphql-types';

import Row from './table-row';

interface Props {
  categories: (CategoryFragment | null)[];
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
      { categories.map((c) => c ? <Row category={ c } key={ c.id } /> : null) }
  </tbody>
  </Table>
);

export default CategoriesTable;

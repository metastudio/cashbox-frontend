import * as React from 'react';
import { Table } from 'react-bootstrap';

import { ICategory } from 'services/categories';

import Row from './table-row';

interface IProps {
  categories: ICategory[];
}

const CategoriesTable: React.SFC<IProps> = ({ categories }) => (
  <Table striped responsive hover id="categories">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th colSpan={ 2 } />
      </tr>
    </thead>
    <tbody>
      { categories.map(c => c ? <Row category={ c } key={ c.id } /> : null) }
  </tbody>
  </Table>
);

export default CategoriesTable;

import * as React from 'react';
import Row from './table-row.jsx';

const CategoriesTableBody = ({ categories }) => (
  <tbody>
    { categories.map((c) => <Row category={ c } key={ c.id } />) }
  </tbody>
);

export default CategoriesTableBody;

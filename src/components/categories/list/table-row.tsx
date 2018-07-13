import * as React from 'react';
import { Link } from 'react-router-dom';

import { Category } from 'services/categories';

import DestroyButton from '../destroy';

interface Props {
  category: Category;
}

const CategoriesTableRow: React.SFC<Props> = ({ category }) => (
  <tr>
    <td>{ category.name }</td>
    <td>{ category.type }</td>
    <td><Link to={ `/categories/${category.id}/edit` } title="Edit"><i className="fa fa-edit" /></Link></td>
    <td><DestroyButton category={ category } /></td>
  </tr>
);

export default CategoriesTableRow;

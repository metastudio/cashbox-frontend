import * as React from 'react';
import { Link } from 'react-router-dom';

import { ICategory } from 'services/categories';

import DestroyButton from '../destroy';

interface IProps {
  category: ICategory;
}

const CategoriesTableRow: React.SFC<IProps> = ({ category }) => (
  <tr>
    <td>{ category.name }</td>
    <td>{ category.type }</td>
    <td><Link to={ `/categories/${category.id}/edit` } title="Edit"><i className="fa fa-edit" /></Link></td>
    <td><DestroyButton category={ category } /></td>
  </tr>
);

export default CategoriesTableRow;

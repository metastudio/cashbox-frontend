import * as React from 'react';
import { Link } from 'react-router-dom';

import { CategoryFragment } from 'graphql-types';

import DestroyButton from '../destroy';

interface Props {
  category: CategoryFragment;
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

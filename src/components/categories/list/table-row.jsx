import * as React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import DestroyButton from './destroy.jsx';

class CategoriesTableRow extends React.Component {
  render() {
    const { category } = this.props;

    return(
      <tr key={ category.id }>
        <td>{ category.name }</td>
        <td>{ category.type }</td>
        <td><Link to={ `/categories/${category.id}/edit` }><i className="fa fa-edit" /></Link></td>
        <td><DestroyButton category={ category } /></td>
      </tr>
    );
  }
}

CategoriesTableRow.propTypes = {
  category: PropTypes.object.isRequired,
};

export default withRouter(CategoriesTableRow);

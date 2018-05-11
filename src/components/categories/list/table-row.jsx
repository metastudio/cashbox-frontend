import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { confirm } from 'components/utils/confirm';
import { addFlashMessage } from 'actions/flash-messages.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { deleteCategory } from 'actions/categories.js';

class CategoriesTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteCategoryClick = this.handleDeleteCategoryClick.bind(this);
  }

  handleDeleteCategoryClick(categoryId) {
    const { orgId, deleteCategory } = this.props;
    deleteCategory(orgId, categoryId).then(category => {
      this.props.addFlashMessage('Category ' + category.name + ' successfully deleted.');
      this.props.history.push('/categories');
    }).catch(error => {
      this.props.addFlashMessage(`Unable to delete category: ${error.message}`, { type: 'danger' });
    });
  }

  render() {
    const { category } = this.props;

    return(
      <tr key={ category.id }>
        <td>{ category.name }</td>
        <td>{ category.type }</td>
        <td><Link to={ `/categories/${category.id}/edit` }><i className="fa fa-edit" /></Link></td>
        <td>
          <Link
            to={ '/categories' }
            onClick={ () => { confirm('Are you sure?').then( () => { this.handleDeleteCategoryClick(category.id) }) } }>
            <i className="fa fa-trash-o" />
          </Link>
        </td>
      </tr>
    );
  }
}

CategoriesTableRow.propTypes = {
  orgId:           PropTypes.number.isRequired,
  deleteCategory:  PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  category:        PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
});

const dispatcher = (dispatch) => ({
  deleteCategory:  (organizationId, categoryId) => new Promise((res, rej) => dispatch(deleteCategory(organizationId, categoryId, res, rej))),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(CategoriesTableRow));

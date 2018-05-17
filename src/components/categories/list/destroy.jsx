import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { addFlashMessage } from 'actions/flash-messages.js';
import { deleteCategory } from 'actions/categories.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { confirm } from 'components/utils/confirm';

class DestroyCategory extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteCategoryClick = this.handleDeleteCategoryClick.bind(this);
  }

  handleDeleteCategoryClick() {
    const { orgId, category, deleteCategory } = this.props;

    confirm('Are you sure?').then( () => {
      deleteCategory(orgId, category.id).then(category => {
        this.props.addFlashMessage('Category ' + category.name + ' successfully deleted.');
        this.props.history.push('/categories');
      }).catch(error => {
        this.props.addFlashMessage(`Unable to delete category: ${error.message}`, { type: 'danger' });
      });
    });
  }

  render() {
    return (
      <Link
        to={ '/categories' }
        onClick={ () => this.handleDeleteCategoryClick() }>
        <i className="fa fa-trash-o" />
      </Link>
    );
  }
}

DestroyCategory.propTypes = {
  orgId:           PropTypes.number.isRequired,
  deleteCategory:  PropTypes.func.isRequired,
  category:        PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history:         PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
});

const dispatcher = (dispatch) => ({
  deleteCategory:  (organizationId, categoryId) => new Promise((res, rej) => dispatch(deleteCategory(organizationId, categoryId, res, rej))),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(DestroyCategory));

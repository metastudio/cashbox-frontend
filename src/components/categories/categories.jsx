import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { addFlashMessage } from 'actions/flash-messages.js';
import { loadCategories, deleteCategory } from 'actions/categories.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

import LoadingView from 'components/utils/loading-view';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteCategoryClick = this.handleDeleteCategoryClick.bind(this);
  }

  componentDidMount() {
    const { orgId, loadCategories } = this.props;
    loadCategories(orgId);
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
    const categories = this.props.categories.map((category) => (
      <tr key={ category.id }>
        <td>{ category.name }</td>
        <td>{ category.type }</td>
        <td><Link to={ `/categories/${category.id}/edit` } className="btn btn-primary">Edit</Link></td>
        <td><Button bsStyle="danger" onClick={ () => this.handleDeleteCategoryClick(category.id) }>Delete</Button></td>
      </tr>
    )
    );

    return (
      <LoadingView status={ this.props.status }>
        <Link to="/categories/new" className="btn btn-primary">Add...</Link>
        { this.props.status === statuses.SUCCESS &&
          <Table striped responsive hover id="categories">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { categories }
            </tbody>
          </Table>
        }
      </LoadingView>
    );
  }
}

Categories.propTypes = {
  orgId:           PropTypes.number.isRequired,
  loadCategories:  PropTypes.func.isRequired,
  deleteCategory:  PropTypes.func.isRequired,
  status:          PropTypes.string.isRequired,
  categories:      PropTypes.arrayOf(PropTypes.object).isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history:         PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId:      getCurrentOrganizationId(state),
  categories: state.categories.items,
  status:     state.categories.status,
});

const dispatcher = (dispatch) => ({
  loadCategories:  (organizationId) => dispatch(loadCategories(organizationId)),
  deleteCategory:  (organizationId, categoryId) => new Promise((res, rej) => dispatch(deleteCategory(organizationId, categoryId, res, rej))),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(Categories));

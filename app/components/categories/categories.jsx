import React from 'react'
import * as statuses from 'constants/statuses'

import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Link } from 'react-router'
import { Table, Button } from 'react-bootstrap'

import LoadingView from 'components/utils/loading-view'

import { loadCategories, deleteCategory, addFlashMessage } from 'actions'
import { getCurrentOrganizationId } from 'selectors'

class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.handleEditCategoryClick = this.handleEditCategoryClick.bind(this)
    this.handleDeleteCategoryClick = this.handleDeleteCategoryClick.bind(this)
  }

  componentDidMount() {
    const { orgId, loadCategories } = this.props
    loadCategories(orgId)
  }

  handleEditCategoryClick(categoryId) {
    this.props.redirectToEditCategory(categoryId)
  }

  handleDeleteCategoryClick(categoryId) {
    const { orgId, deleteCategory } = this.props
    deleteCategory(orgId, categoryId).then(
      ({error, payload}) => {
        if (error) {
          this.props.addFlashMessage('Unable to delete category. ' + payload, { type: 'danger' })
        } else {
          this.props.addFlashMessage('Category successfully deleted.')
          this.props.redirectToCategories()
        }
      }
    )
  }

  render() {
    const categories = this.props.categories.map((category) => (
      <tr key={ category.id }>
        <td>{ category.name }</td>
        <td>{ category.type }</td>
        <td><Button bsStyle="primary" onClick={ () => this.handleEditCategoryClick(category.id) }>Edit</Button></td>
        <td><Button bsStyle="danger" onClick={ () => this.handleDeleteCategoryClick(category.id) }>Delete</Button></td>
      </tr>
      )
    )

    return (
      <LoadingView status={ this.props.status }>
        <Link to="/categories/new" className="btn btn-primary">Add...</Link>
        { this.props.status == statuses.SUCCESS &&
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
    )
  }
}

Categories.propTypes = {
  orgId:                  React.PropTypes.number.isRequired,
  loadCategories:         React.PropTypes.func.isRequired,
  deleteCategory:         React.PropTypes.func.isRequired,
  status:                 React.PropTypes.string.isRequired,
  categories:             React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  redirectToEditCategory: React.PropTypes.func.isRequired,
  redirectToCategories:   React.PropTypes.func.isRequired,
  addFlashMessage:        React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId:      getCurrentOrganizationId(state),
  categories: state.categories.items,
  status:     state.categories.status,
})

const dispatcher = (dispatch) => ({
  loadCategories:         (organizationId) => dispatch(loadCategories(organizationId)),
  deleteCategory:         (organizationId, categoryId) => new Promise((res, rej) => dispatch(deleteCategory(organizationId, categoryId, res, rej))),
  redirectToEditCategory: (categoryId) => dispatch(routeActions.push(`/categories/${categoryId}/edit`)),
  redirectToCategories:   () => dispatch(routeActions.push('/categories')),
  addFlashMessage:        (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(Categories)

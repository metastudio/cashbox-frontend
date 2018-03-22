import React from 'react'
import * as statuses from 'constants/statuses'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel, Row, Col } from 'react-bootstrap'

import LoadingView from 'components/utils/loading-view'
import { loadCategory, updateCategory, addFlashMessage } from 'actions'
import { getCurrentOrganizationId } from 'selectors'

import Form from './form.jsx'

class EditCategory extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterUpdate  = this.afterUpdate.bind(this)
  }

  componentDidMount() {
    const { orgId, loadCategory } = this.props
    loadCategory(orgId, this.props.params.categoryId)
  }

  handleSubmit(values) {
    const { orgId, category, updateCategory } = this.props
    return updateCategory(orgId, category.id, {
      name: values.name,
      type: values.type,
    })
  }

  afterUpdate() {
    this.props.addFlashMessage('Category successfully updated.')
    this.props.redirectToCategories()
  }

  render() {
    return(
      <LoadingView status={ this.props.status }>
        { this.props.status == statuses.SUCCESS &&
          <Row>
            <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
              <Panel>
                <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterUpdate } />
              </Panel>
            </Col>
          </Row>
        }
      </LoadingView>
    )
  }
}

EditCategory.propTypes = {
  params:               React.PropTypes.object.isRequired,
  orgId:                React.PropTypes.number.isRequired,
  category:             React.PropTypes.object,
  status:               React.PropTypes.string.isRequired,
  loadCategory:         React.PropTypes.func.isRequired,
  updateCategory:       React.PropTypes.func.isRequired,
  redirectToCategories: React.PropTypes.func.isRequired,
  addFlashMessage:      React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId:    getCurrentOrganizationId(state),
  category: state.category.data,
  status:   state.category.status,
})

const dispatcher = (dispatch) => ({
  loadCategory:         (orgId, categoryId) => dispatch(loadCategory(orgId, categoryId)),
  updateCategory:       (orgId, categoryId, data) => new Promise((res, rej) => dispatch(updateCategory(orgId, categoryId, data, res, rej))),
  redirectToCategories: () => dispatch(routeActions.push('/categories')),
  addFlashMessage:      (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(EditCategory)

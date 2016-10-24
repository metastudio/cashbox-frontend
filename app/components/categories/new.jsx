import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel, Row, Col } from 'react-bootstrap'

import { createCategory, clearCategory, addFlashMessage } from 'actions'
import { getCurrentOrganizationId } from 'selectors'

import Form from './form.jsx'

class NewCategory extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)
  }

  componentDidMount() {
    this.props.clearCategory()
  }

  handleSubmit(values) {
    const { orgId, createCategory } = this.props
    return createCategory(orgId, {
      name: values.name,
      type: values.type,
    })
  }

  afterCreate() {
    this.props.addFlashMessage('Category successfully created.')
    this.props.redirectToCategories()
  }

  render() {
    return(
      <Row>
        <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
          <Panel>
            <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterCreate } />
          </Panel>
        </Col>
      </Row>
    )
  }
}

NewCategory.propTypes = {
  orgId:                React.PropTypes.number.isRequired,
  createCategory:       React.PropTypes.func.isRequired,
  clearCategory:        React.PropTypes.func.isRequired,
  redirectToCategories: React.PropTypes.func.isRequired,
  addFlashMessage:      React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
})

const dispatcher = (dispatch) => ({
  createCategory:       (orgId, data) => new Promise((res, rej) => dispatch(createCategory(orgId, data, res, rej))),
  clearCategory:        () => dispatch(clearCategory()),
  redirectToCategories: () => dispatch(routeActions.push('/categories')),
  addFlashMessage:      (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(NewCategory)

import React from 'react'
import * as statuses from 'constants/statuses'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel, Row, Col } from 'react-bootstrap'

import LoadingView from 'components/utils/loading-view'
import { loadCustomer, updateCustomer, addFlashMessage } from 'actions'
import { getCurrentOrganizationId } from 'selectors'

import Form from './form.jsx'

class EditCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterUpdate  = this.afterUpdate.bind(this)
  }

  componentDidMount() {
    const { orgId, loadCustomer } = this.props
    loadCustomer(orgId, this.props.params.customerId)
  }

  handleSubmit(values) {
    const { orgId, customer, updateCustomer } = this.props
    return updateCustomer(orgId, customer.id, {
      name: values.name,
      invoiceDetails: values.invoiceDetails,
    })
  }

  afterUpdate() {
    this.props.addFlashMessage('Customer successfully updated.')
    this.props.redirectToCustomers()
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

EditCustomer.propTypes = {
  params:              React.PropTypes.object.isRequired,
  orgId:               React.PropTypes.number.isRequired,
  customer:            React.PropTypes.object,
  status:              React.PropTypes.string.isRequired,
  loadCustomer:        React.PropTypes.func.isRequired,
  updateCustomer:      React.PropTypes.func.isRequired,
  redirectToCustomers: React.PropTypes.func.isRequired,
  addFlashMessage:     React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId:    getCurrentOrganizationId(state),
  customer: state.customer.data,
  status:   state.customer.status,
})

const dispatcher = (dispatch) => ({
  loadCustomer:        (orgId, customerId) => dispatch(loadCustomer(orgId, customerId)),
  updateCustomer:      (orgId, customerId, data) => new Promise((res, rej) => dispatch(updateCustomer(orgId, customerId, data, res, rej))),
  redirectToCustomers: () => dispatch(routeActions.push('/customers')),
  addFlashMessage:     (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(EditCustomer)

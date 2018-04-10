import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Panel, Row, Col } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { addFlashMessage } from 'actions/flash-messages.js';
import { loadCustomer, updateCustomer } from 'actions/customers.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { prepareSubmissionError } from 'utils/errors';

import LoadingView from 'components/utils/loading-view';
import Form from './form.jsx';

class EditCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterUpdate  = this.afterUpdate.bind(this);
  }

  componentDidMount() {
    const { orgId, loadCustomer } = this.props;
    loadCustomer(orgId, this.props.match.params.customerId);
  }

  handleSubmit(values) {
    const { orgId, customer, updateCustomer } = this.props;
    return updateCustomer(orgId, customer.id, {
      name: values.name,
      invoiceDetails: values.invoiceDetails,
    }).catch(prepareSubmissionError);
  }

  afterUpdate() {
    this.props.addFlashMessage('Customer successfully updated.');
    this.props.history.push('/customers');
  }

  render() {
    return(
      <LoadingView status={ this.props.status }>
        { this.props.status === statuses.SUCCESS &&
          <Row>
            <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
              <Panel>
                <Panel.Body>
                  <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterUpdate } initialValues={ this.props.customer } />
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        }
      </LoadingView>
    );
  }
}

EditCustomer.propTypes = {
  match:           PropTypes.object.isRequired,
  orgId:           PropTypes.number.isRequired,
  customer:        PropTypes.object,
  status:          PropTypes.string.isRequired,
  loadCustomer:    PropTypes.func.isRequired,
  updateCustomer:  PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history:         PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId:    getCurrentOrganizationId(state),
  customer: state.customer.data,
  status:   state.customer.status,
});

const dispatcher = (dispatch) => ({
  loadCustomer:        (orgId, customerId) => dispatch(loadCustomer(orgId, customerId)),
  updateCustomer:      (orgId, customerId, data) => new Promise((res, rej) => dispatch(updateCustomer(orgId, customerId, data, res, rej))),
  addFlashMessage:     (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(EditCustomer));

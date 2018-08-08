import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Panel, Row, Col, PageHeader } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { addFlashMessage } from 'services/flash-messages';
import { loadCustomer, updateCustomer, selectCustomerStatus, selectCustomer } from 'services/customers';
import { selectCurrentOrganizationId } from 'services/organizations';
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
    const { orgId, load } = this.props;
    load(orgId, this.props.match.params.customerId);
  }

  handleSubmit(values) {
    const { orgId, customer, update } = this.props;
    return update(orgId, customer.id, {
      name: values.name,
      invoiceDetails: values.invoiceDetails,
    }).catch(prepareSubmissionError);
  }

  afterUpdate() {
    const { message, history } = this.props;

    message('Customer successfully updated.');
    history.push('/customers');
  }

  render() {
    return(
      <LoadingView status={ this.props.status }>
        { this.props.status === statuses.SUCCESS &&
          <Row>
            <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
              <PageHeader>Edit Customer</PageHeader>
              <Panel>
                <Panel.Body>
                  <Form
                    onSubmit={ this.handleSubmit }
                    onSubmitSuccess={ this.afterUpdate }
                    initialValues={ this.props.customer }
                    action="Update"
                  />
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
  match:    PropTypes.object.isRequired,
  orgId:    PropTypes.number.isRequired,
  customer: PropTypes.object,
  status:   PropTypes.string.isRequired,
  load:     PropTypes.func.isRequired,
  update:   PropTypes.func.isRequired,
  message:  PropTypes.func.isRequired,
  history:  PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId:    selectCurrentOrganizationId(state),
  customer: selectCustomer(state),
  status:   selectCustomerStatus(state),
});

const dispatcher = (dispatch) => ({
  load:    (orgId, customerId) => dispatch(loadCustomer(orgId, customerId)),
  update:  (orgId, customerId, data) => (
    new Promise((res, rej) => dispatch(updateCustomer(orgId, customerId, data, res, rej)))
  ),
  message: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(EditCustomer));

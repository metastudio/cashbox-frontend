import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Panel, Row, Col } from 'react-bootstrap';

import { addFlashMessage } from 'actions/flash-messages.js';
import { createCustomer, clearCustomer } from 'actions/customers.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { prepareSubmissionError } from 'utils/errors';

import Form from './form.jsx';

class NewCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterCreate  = this.afterCreate.bind(this);
  }

  componentDidMount() {
    this.props.clearCustomer();
  }

  handleSubmit(values) {
    const { orgId, createCustomer } = this.props;
    return createCustomer(orgId, {
      name: values.name,
      invoiceDetails: values.invoiceDetails,
    }).catch(prepareSubmissionError);
  }

  afterCreate() {
    this.props.addFlashMessage('Customer successfully created.');
    this.props.history.push('/customers');
  }

  render() {
    return(
      <Row>
        <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
          <Panel>
            <Panel.Body>
              <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterCreate } action="Create" />
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}

NewCustomer.propTypes = {
  orgId:           PropTypes.number.isRequired,
  createCustomer:  PropTypes.func.isRequired,
  clearCustomer:   PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history:         PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
});

const dispatcher = (dispatch) => ({
  createCustomer:  (orgId, data) => new Promise((res, rej) => dispatch(createCustomer(orgId, data, res, rej))),
  clearCustomer:   () => dispatch(clearCustomer()),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(NewCustomer));

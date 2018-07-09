import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Panel, Row, Col } from 'react-bootstrap';

import { addFlashMessage } from 'actions/flash-messages.js';
import { createBankAccount, clearBankAccount } from 'services/bank-accounts';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { prepareSubmissionError } from 'utils/errors';

import Form from './form.jsx';

class NewBankAccount extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterCreate  = this.afterCreate.bind(this);
  }

  componentDidMount() {
    this.props.clearBankAccount();
  }

  handleSubmit(values) {
    const { orgId, createBankAccount } = this.props;
    return createBankAccount(orgId, {
      name: values.name,
      description: values.description,
      invoiceDetails: values.invoiceDetails,
      currency: values.currency,
    }).catch(prepareSubmissionError);
  }

  afterCreate() {
    this.props.addFlashMessage('Bank account successfully created.');
    this.props.history.push('/bank_accounts');
  }

  render() {
    return(
      <Row>
        <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
          <h1>New Bank Account</h1>
          <Panel>
            <Panel.Body>
              <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterCreate } action="Create"/>
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}

NewBankAccount.propTypes = {
  orgId:             PropTypes.number.isRequired,
  createBankAccount: PropTypes.func.isRequired,
  clearBankAccount:  PropTypes.func.isRequired,
  addFlashMessage:   PropTypes.func.isRequired,
};

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
});

const dispatcher = (dispatch) => ({
  createBankAccount: (orgId, data) => new Promise((res, rej) => dispatch(createBankAccount(orgId, data, res, rej))),
  clearBankAccount:  () => dispatch(clearBankAccount()),
  addFlashMessage:   (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(NewBankAccount));

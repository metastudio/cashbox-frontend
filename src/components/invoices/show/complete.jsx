import * as React from 'react';
import PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Transaction, TransactionParams } from 'model-types';
import Form from 'components/transactions/form/form.jsx';
import { addFlashMessage } from 'actions/flash-messages.js';
import { selectInvoice } from 'selectors/invoices.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectCustomerByName, selectCustomers } from 'selectors/customers.js';
import { prepareSubmissionError } from 'utils/errors';
import { formatMoney } from 'utils/money';
import { createTransaction } from 'actions/transactions.js';

class CompleteInvoiceButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterCreate = this.afterCreate.bind(this);
    this.initialValues = this.initialValues.bind(this);

    this.state = {
      show: false
    };
  }

  handleSubmit = (values) => {
    console.log(parseFloat(values.amount));
    const { orgId, createTransaction } = this.props;
    return createTransaction(orgId, {
      amount: values.amount,
      categoryId: values.category,
      customerId: values.customer,
      bankAccountId: values.bankAccount,
      comment: values.comment,
      date: values.date,
    }).catch(prepareSubmissionError);
  }

  afterCreate = () => {
    this.props.flashMessage('Transaction successfully created.');
    this.props.history.push('/invoices');
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
    console.log(this.props.invoice);
  }

  initialValues() {
    const { invoice } = this.props
    return({
      amount: formatMoney(invoice.amount, false),
      customer: invoice.customer ? invoice.customer.id : null
    })
  }

  render() {
    return([
      <Button key='button' bsStyle="primary" onClick={ this.handleShow } >Complete Invoice</Button>,
      <Modal key='modal' show={ this.state.show } onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>New Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={ this.handleSubmit }
            onSubmitSuccess={ this.afterCreate }
            initialValues= { this.initialValues() }
            type="Income"
          />
        </Modal.Body>
      </Modal>
    ])
  }
}

CompleteInvoiceButton.propTypes = {
  invoice:    PropTypes.object.isRequired,
  orgId:      PropTypes.number.isRequired,
  customer:   PropTypes.object,
  customers:  PropTypes.array.isRequired,
}

const mapState = (state) => ({
  orgId:        getCurrentOrganizationId(state),
  invoice:      selectInvoice(state),
  customer:     selectCustomerByName(state),
  customers:    selectCustomers(state),
});

const mapDispatch = (dispatch) => ({
  flashMessage: (msg) => dispatch(addFlashMessage(msg)),
  createTransaction: (orgId, data) => new Promise((res, rej) => dispatch(createTransaction(orgId, data, res, rej))),
});

export default withRouter(connect(mapState, mapDispatch)(CompleteInvoiceButton));

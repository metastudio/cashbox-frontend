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


class CompleteInvoiceButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterCreate = this.afterCreate.bind(this);

    this.state = {
      show: false
    };
  }

  handleSubmit = (values) => {
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
    this.props.history.push('/transactions');
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
    console.log(this.props.invoice);
  }

  render() {
    if (this.props.customers) {
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
              initialValues= {
                {
                  amount: this.props.invoice.amount.fractional,
                }
              }
              type="Income"
            />
          </Modal.Body>
        </Modal>
      ])
    } else {
      return null;
    }
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
});

export default connect(mapState, mapDispatch)(CompleteInvoiceButton);

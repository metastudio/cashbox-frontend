import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Invoice, TransactionParams } from 'model-types';
import Form from 'components/transactions/form/form.jsx';
import { addFlashMessage } from 'actions/flash-messages.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { prepareSubmissionError } from 'utils/errors';
import { moneyToString } from 'utils/money';
import { createTransaction as createTransactionAction } from 'actions/transactions.js';

interface StateProps {
  invoice: Invoice;
  orgId:   number;
}

interface CompleteState {
  show: boolean;
}

interface DispatchProps {
  createTransaction: (orgId: number, data: TransactionParams) => Promise<{}>;
  flashMessage:      (msg: string) => void;
}

type Props = RouteComponentProps<{}> & DispatchProps & StateProps;

class CompleteInvoiceButton extends React.Component<Props, CompleteState> {
  constructor(props: Props) {
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

  handleSubmit = (values: TransactionParams) => {
    const { orgId, createTransaction } = this.props;
    return createTransaction(orgId, {
      amount: values.amount,
      categoryId: values.categoryId,
      customerId: values.customerId,
      bankAccountId: values.bankAccountId,
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
  }

  initialValues() {
    const { invoice } = this.props;
    return({
      amount: moneyToString(invoice.amount),
      customerId: invoice.customerId
    });
  }

  render() {
    return(
      <>
        <Button 
          key="button"
          bsStyle="primary"
          onClick={ this.handleShow }
        >
        Complete Invoice
        </Button>
        <Modal key="modal" show={ this.state.show } onHide={ this.handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>New Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={ this.handleSubmit }
              onSubmitSuccess={ this.afterCreate }
              initialValues={ this.initialValues() }
              type="Income"
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapState = (state: { show: boolean; }) => ({
  orgId:        getCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  flashMessage: (msg: string) => dispatch(addFlashMessage(msg)),
  createTransaction: (orgId: number, data: TransactionParams) => (
    new Promise((res, rej) => dispatch(createTransactionAction(orgId, data, res, rej)))
  ),
});

export default withRouter(connect(mapState, mapDispatch)(CompleteInvoiceButton));

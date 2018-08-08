import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Invoice } from 'services/invoices';
import { addFlashMessage } from 'services/flash-messages';
import { selectCurrentOrganizationId } from 'services/organizations';
import { ITransactionParams, createTransaction } from 'services/transactions';
import { prepareSubmissionError } from 'utils/errors';
import { formatMoneyValue, formatMoneyParam } from 'utils/money';

import Form from 'components/transactions/form/form.jsx';

interface IStateProps {
  invoice: Invoice;
  orgId:   number;
}

interface ICompleteState {
  show: boolean;
}

interface IDispatchProps {
  create:       (orgId: number, data: ITransactionParams) => Promise<{}>;
  flashMessage: (msg: string) => void;
}

type IProps = RouteComponentProps<{}> & IDispatchProps & IStateProps;

class CompleteInvoiceButton extends React.Component<IProps, ICompleteState> {
  constructor(props: IProps) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterCreate = this.afterCreate.bind(this);
    this.initialValues = this.initialValues.bind(this);

    this.state = {
      show: false,
    };
  }

  private handleSubmit = (values: ITransactionParams) => {
    const { orgId, create } = this.props;
    return create(orgId, {
      amount:        formatMoneyParam(values.amount),
      categoryId:    values.categoryId,
      customerId:    values.customerId,
      bankAccountId: values.bankAccountId,
      comment:       values.comment,
      date:          values.date,
    }).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    this.props.flashMessage('Transaction successfully created.');
    this.props.history.push('/invoices');
  }

  private handleClose() {
    this.setState({ show: false });
  }

  private handleShow() {
    this.setState({ show: true });
  }

  private initialValues() {
    const { invoice } = this.props;
    return({
      amount:     formatMoneyValue(invoice.amount),
      customerId: invoice.customerId,
    });
  }

  public render() {
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
  orgId:        selectCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  flashMessage: (msg: string) => dispatch(addFlashMessage(msg)),
  create: (orgId: number, data: ITransactionParams) => (
    new Promise((res, rej) => dispatch(createTransaction(orgId, data, res, rej)))
  ),
});

export default withRouter(connect(mapState, mapDispatch)(CompleteInvoiceButton));

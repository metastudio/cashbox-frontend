import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, Clearfix } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { IInvoice } from 'services/invoices';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import { selectCurrentOrganizationId } from 'services/organizations';
import { ITransactionParams, createTransaction, ITransaction } from 'services/transactions';
import { prepareSubmissionError } from 'utils/errors';
import { formatMoneyValue, formatMoneyParam } from 'utils/money';

import Form, { ITransactionFormData } from 'components/transactions/forms/normal';
import { CategoryType } from 'services/categories';

interface IOwnProps {
  invoice: IInvoice;
}

interface IStateProps {
  orgId:   number;
}

interface IDispatchProps {
  create:       (orgId: number, data: ITransactionParams) => Promise<ITransaction>;
  flashMessage: AddFlashMessageAction;
}

interface IState {
  show: boolean;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IRouteProps & IDispatchProps & IStateProps;

class CompleteInvoiceButton extends React.Component<IProps, IState> {
  public state: IState = {
    show: false,
  };

  private handleSubmit = (values: ITransactionFormData) => {
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

  private handleClose = () => {
    this.setState({ show: false });
  }

  private handleShow = () => {
    this.setState({ show: true });
  }

  private initialValues = () => {
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
              type={ CategoryType.Income }
              action="Create"
            />
            <Clearfix />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapState = (state: { show: boolean; }): IStateProps => ({
  orgId: selectCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  create: (orgId, data) => new Promise((res, rej) => dispatch(createTransaction(orgId, data, res, rej))),
  flashMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter<IOwnProps & IRouteProps>(
  connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(CompleteInvoiceButton)
);

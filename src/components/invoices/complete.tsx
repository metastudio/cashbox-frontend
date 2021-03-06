import * as React from 'react';

import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { CategoryType } from 'services/categories';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { IInvoice } from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';
import { createTransaction } from 'services/transactions';
import { formatDateValue } from 'utils/date';
import { prepareSubmissionError } from 'utils/errors';
import { formatMoneyParam, formatMoneyValue } from 'utils/money';

import Form, { ITransactionFormData } from 'components/transactions/forms/normal';

interface IOwnProps {
  invoice: IInvoice;
}

interface IStateProps {
  orgId: number;
}

interface IDispatchProps {
  create:       typeof createTransaction.request;
  flashMessage: typeof addFlashMessage;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IRouteProps & IDispatchProps & IStateProps;

class CompleteInvoiceButton extends React.Component<IProps> {
  private handleSubmit = (values: ITransactionFormData) => {
    const { orgId, create, invoice } = this.props;
    return new Promise((resolve, reject) => {
      create(
        orgId,
        {
          amount:        formatMoneyParam(values.amount),
          categoryId:    values.categoryId,
          customerId:    values.customerId,
          bankAccountId: values.bankAccountId,
          invoiceId:     invoice.id,
          comment:       values.comment,
          date:          values.date,
        },
        resolve,
        reject,
      );
    }).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    this.props.flashMessage('Transaction successfully created.');
    this.props.history.push('/invoices');
  }

  private handleClose = () => {
    const { invoice } = this.props;
    this.props.history.push(`/invoices/${invoice.id}`);
  }

  private initialValues = (): ITransactionFormData => {
    const { invoice } = this.props;
    return({
      amount:        formatMoneyValue(invoice.amount),
      customerId:    invoice.customerId,
      bankAccountId: invoice.bankAccountId,
      date:          formatDateValue(new Date()),
    });
  }

  public render() {
    return(
      <Modal key="modal" show onHide={ this.handleClose }>
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
        </Modal.Body>
      </Modal>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  orgId: selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  create: (orgId, data, res, rej) => dispatch(createTransaction.request(orgId, data, res, rej)),
  flashMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter<IOwnProps & IRouteProps>(
  connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(CompleteInvoiceButton),
);

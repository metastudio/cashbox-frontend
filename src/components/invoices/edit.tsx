import * as React from 'react';

import { Col, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import {
  IInvoice, InvoiceParams,
  updateInvoice,
} from 'services/invoices';
import { prepareSubmissionError } from 'utils/errors';
import { formatMoneyParam, formatMoneyValue } from 'utils/money';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import Form, { IInvoiceFormData } from './form';
import Provider from './providers/invoice';

interface IDispatchProps {
  update:  (orgId: ID, invoiceId: ID, data: InvoiceParams) => Promise<IInvoice>;
  message: AddFlashMessageAction;
}

type IProps = RouteComponentProps<{ id: string }> & ICurrentOrgIdProps & IDispatchProps;

class EditInvoice extends React.Component<IProps> {
  private handleSubmit = (values: IInvoiceFormData) => {
    const { orgId, update, match: { params: { id } } } = this.props;

    return update(
      orgId,
      Number(id),
      {
        currency:      values.currency,
        bankAccountId: values.bankAccountId,
        amount:        formatMoneyParam(values.amount),
        number:        Number(values.number),
        customerId:    values.customerId,
        startsAt:      values.startsAt,
        endsAt:        values.endsAt,
        sentAt:        values.sentAt,
        paidAt:        values.paidAt,
        invoiceItemsAttributes: values.invoiceItems.map(item => ({
          _destroy:     item._destroy,
          id:           item.id,
          customerId:   item.customerId,
          date:         item.date,
          hours:        Number(item.hours),
          description:  item.description,
          amount:       formatMoneyParam(item.amount),
        })),
      },
    ).catch(prepareSubmissionError);
  }

  private initialPrepare = (invoice: IInvoice): IInvoiceFormData => {
    return ({
      amount:        formatMoneyValue(invoice.amount),
      currency:      invoice.currency,
      bankAccountId: invoice.bankAccountId,
      customerId:    invoice.customerId,
      endsAt:        invoice.endsAt,
      number:        invoice.number,
      startsAt:      invoice.startsAt,
      sentAt:        invoice.sentAt,
      paidAt:        invoice.paidAt,
      invoiceItems: invoice.invoiceItems.map(item => ({
        id:          item.id,
        customerId:  item.customerId,
        amount:      formatMoneyValue(item.amount),
        date:        item.date,
        hours:       item.hours,
        description: item.description,
      })),
    });
  }

  private afterUpdate = () => {
    const { message, history } = this.props;
    message('Invoice has been updated');
    history.push('/invoices');
  }

  private renderForm = (invoice: IInvoice) => {
    return (
      <Form
        onSubmit={ this.handleSubmit }
        onSubmitSuccess={ this.afterUpdate }
        initialValues={ this.initialPrepare(invoice) }
        action="Update"
      />
    );
  }

  public render() {
    const { orgId, match: { params: { id } } } = this.props;

    return(
      <Col sm={ 6 } smOffset={ 3 }>
        <PageHeader>Edit Invoice</PageHeader>
        <Provider orgId={ orgId } invoiceId={ Number(id) }>
          { this.renderForm }
        </Provider>
      </Col>
    );
  }
}

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  update: (orgId, invoiceId, data) => new Promise<IInvoice>((res, rej) => {
    dispatch(updateInvoice(orgId, invoiceId, data, res, rej));
  }),
  message: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(
  withCurrentOrgId(
    connect<{}, IDispatchProps>(undefined, mapDispatch)(EditInvoice),
  ),
);

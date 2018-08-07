import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Col, PageHeader } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router';
import { formatMoneyValue, formatMoneyParam } from 'utils/money';

import { Status } from 'model-types';
import {
  Invoice, InvoiceParams,
  loadInvoice, updateInvoice,
  selectInvoice, selectInvoiceStatus,
} from 'services/invoices';
import { addFlashMessage } from 'services/flash-messages';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import Form, { InvoiceFormData } from './form';
import LoadingView from '../utils/loading-view';

interface StateProps {
  orgId:   number;
  status:  Status;
  invoice: Invoice | null;
}
interface DispatchProps {
  load:         (orgId: number, invoiceId: number) => void;
  update:       (orgId: number, invoiceId: number, data: InvoiceParams) => Promise<Invoice>;
  flashMessage: (msg: string) => void;
}

type Props = RouteComponentProps<{ id: string }> & StateProps & DispatchProps;

class EditInvoice extends React.Component<Props> {
  handleSubmit = (values: InvoiceFormData) => {
    const { orgId, update, invoice } = this.props;
    if (!invoice) { return; }

    return update(
      orgId,
      invoice.id,
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
        invoiceItemsAttributes: values.invoiceItems.map((item) => ({
          _destroy:     item._destroy,
          id:           item.id,
          customerId:   item.customerId,
          date:         item.date,
          hours:        Number(item.hours),
          description:  item.description,
          amount:       formatMoneyParam(item.amount),
        }))
      }
    ).catch(prepareSubmissionError);
  }

  initialPrepare = (invoice: Invoice): InvoiceFormData => {
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
      invoiceItems: invoice.invoiceItems.map((item) => ({
        id:          item.id,
        customerId:  item.customerId,
        amount:      formatMoneyValue(item.amount),
        date:        item.date,
        hours:       item.hours,
        description: item.description,
      }))
    });
  }

  afterUpdate = () => {
    const { flashMessage, history } = this.props;
    flashMessage('Invoice was updated successfully');
    history.push('/invoices');
  }

  componentDidMount() {
    const { orgId, match, load } = this.props;

    load(orgId, Number(match.params.id));
  }

  render() {
    const { status, invoice } = this.props;

    if (status !== Status.Success || !invoice) {
      return <LoadingView status={ status } />;
    }

    return(
      <Col sm={ 6 } smOffset={ 3 }>
        <PageHeader>Edit Invoice</PageHeader>
        <Form
          onSubmit={ this.handleSubmit }
          onSubmitSuccess={ this.afterUpdate }
          initialValues={ this.initialPrepare(invoice) }
          action="Update"
        />
      </Col>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:   selectCurrentOrganizationId(state),
  status:  selectInvoiceStatus(state),
  invoice: selectInvoice(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load:          (orgId: number, invoiceId: number) => dispatch(loadInvoice(orgId, invoiceId)),
  update:        (orgId: number, invoiceId: number, data: InvoiceParams) => new Promise<Invoice>((res, rej) => {
    dispatch(updateInvoice(orgId, invoiceId, data, res, rej));
  }),
  flashMessage:  (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(EditInvoice));

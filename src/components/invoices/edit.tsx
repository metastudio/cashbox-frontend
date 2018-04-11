import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Col, PageHeader } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router';

import * as statuses from 'constants/statuses.js';
import { Invoice, InvoiceParams } from 'model-types';
import { loadInvoice, updateInvoice } from 'actions/invoices.js';
import { addFlashMessage } from 'actions/flash-messages.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectInvoice, selectInvoiceStatus } from 'selectors/invoices.js';

import Form, { InvoiceFormData } from './form';
import LoadingView from '../utils/loading-view';

interface StateProps {
  orgId:   number;
  status:  string;
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
        currency:     values.currency,
        amount:       values.amount && values.amount.toString(),
        number:       Number(values.number),
        customerId:   values.customerId,
        startsAt:     values.startsAt,
        endsAt:       values.endsAt,
        sentAt:       values.sentAt,
        paidAt:       values.paidAt,
        invoiceItemsAttributes: values.invoiceItems.map((item) => ({
          customerId:   item.customerId,
          date:         item.date,
          hours:        Number(item.hours),
          description:  item.description,
          amount:       item.amount && item.amount.toString(),
        }))
      }
    );
  }

  initialPrepare = (invoice: Invoice): InvoiceFormData => {
    return ({
      amount:     invoice.amount,
      currency:   invoice.currency,
      customerId: invoice.customerId,
      endsAt:     invoice.endsAt,
      number:     invoice.number,
      startsAt:   invoice.startsAt,
      sentAt:     invoice.sentAt,
      paidAt:     invoice.paidAt,
      invoiceItems: invoice.invoiceItems.map((item) => ({
        id:          item.id,
        customerId:  item.customerId,
        amount:      item.amount,
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

    if (status !== statuses.SUCCESS || !invoice) {
      return <LoadingView status={ status } />;
    }

    return(
      <Col sm={ 6 } smOffset={ 3 }>
        <PageHeader><h1>Edit Invoice</h1></PageHeader>
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
  orgId:   getCurrentOrganizationId(state),
  status:  selectInvoiceStatus(state),
  invoice: selectInvoice(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load:          (orgId: number, invoiceId: number) => dispatch(loadInvoice(orgId, invoiceId)),
  update:        (orgId: number, invoiceId: number, data: InvoiceParams) => new Promise<Invoice>((res, rej) => {
    dispatch(updateInvoice(orgId, invoiceId, data, res, rej));
  }),
  flashMessage:  (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(EditInvoice));

import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { formatMoneyParam } from 'utils/money';

import { Invoice, InvoiceParams } from 'model-types';
import { createInvoice } from 'actions/invoices.js';
import { addFlashMessage } from 'actions/flash-messages.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

import Form, { InvoiceFormData } from './form';

interface StateProps {
  orgId: number;
}
interface DispatchProps {
  create:       (orgId: Number, data: InvoiceParams) => Promise<Invoice>;
  flashMessage: (msg: string) => void;
}
type Props = RouteComponentProps<{}> & StateProps & DispatchProps;

class NewInvoice extends React.Component<Props> {
  handleSubmit = (values: InvoiceFormData) => {
    const { orgId, create } = this.props;
    return create(
      orgId,
      {
        currency:     values.currency,
        amount:       formatMoneyParam(values.amount),
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
          amount:       formatMoneyParam(item.amount),
        })),
      }
    );
  }

  afterCreate = () => {
    const { flashMessage, history } = this.props;
    flashMessage('Invoice was created successfully');
    history.push('/invoices');
  }

  render() {
    return(
      <>
        <PageHeader>New Invoice</PageHeader>
        <Form
          onSubmit={ this.handleSubmit }
          onSubmitSuccess={ this.afterCreate }
          action="Create"
        />
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId: getCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  create: (orgId: number, data: InvoiceParams) => new Promise<Invoice>((res, rej) => {
    dispatch(createInvoice(orgId, data, res, rej));
  }),
  flashMessage: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(NewInvoice));

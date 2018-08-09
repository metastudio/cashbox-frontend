import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { formatMoneyParam } from 'utils/money';

import { IInvoice, InvoiceParams, createInvoice } from 'services/invoices';
import { addFlashMessage } from 'services/flash-messages';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import Form, { IInvoiceFormData } from './form';

interface IStateProps {
  orgId: number;
}
interface IDispatchProps {
  create:       (orgId: number, data: InvoiceParams) => Promise<IInvoice>;
  flashMessage: (msg: string) => void;
}
type Props = RouteComponentProps<{}> & IStateProps & IDispatchProps;

class NewInvoice extends React.Component<Props> {
  private handleSubmit = (values: IInvoiceFormData) => {
    const { orgId, create } = this.props;
    return create(
      orgId,
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
        invoiceItemsAttributes: values.invoiceItems && values.invoiceItems.map(item => ({
          customerId:   item.customerId,
          date:         item.date,
          hours:        Number(item.hours),
          description:  item.description,
          amount:       formatMoneyParam(item.amount),
        })),
      },
    ).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    const { flashMessage, history } = this.props;
    flashMessage('Invoice was created successfully');
    history.push('/invoices');
  }

  public render() {
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
  orgId: selectCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  create: (orgId: number, data: InvoiceParams) => new Promise<IInvoice>((res, rej) => {
    dispatch(createInvoice(orgId, data, res, rej));
  }),
  flashMessage: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(NewInvoice));

import * as React from 'react';

import { PageHeader } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { createInvoice, IInvoice, InvoiceParams } from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';
import { formatMoneyParam } from 'utils/money';

import Form, { IInvoiceFormData } from './form/form';

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
        <BreadcrumbsItem to={ '/invoices/new' }>
          New
        </BreadcrumbsItem>
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

const mapState = (state: IGlobalState): IStateProps => ({
  orgId: selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  create: (orgId: number, data: InvoiceParams) => new Promise<IInvoice>((res, rej) => {
    dispatch(createInvoice(orgId, data, res, rej));
  }),
  flashMessage: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(NewInvoice));

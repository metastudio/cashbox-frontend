import * as React from 'react';

import { PageHeader } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { createInvoice } from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';
import { formatMoneyParam } from 'utils/money';

import Form, { IInvoiceFormData } from './form/form';

interface IStateProps {
  orgId: ID;
}
interface IDispatchProps {
  create:       typeof createInvoice.request;
  flashMessage: typeof addFlashMessage;
}
type Props = RouteComponentProps<{}> & IStateProps & IDispatchProps;

class NewInvoice extends React.Component<Props> {
  private handleSubmit = (values: IInvoiceFormData) => {
    const { orgId, create } = this.props;
    return new Promise((resolve, reject) => {
      create(
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
        resolve,
        reject,
      );
    }).catch(prepareSubmissionError);
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
  create:       (orgId, data, res, rej) => dispatch(createInvoice.request(orgId, data, res, rej)),
  flashMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(NewInvoice));

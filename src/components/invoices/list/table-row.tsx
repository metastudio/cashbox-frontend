import * as React from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom';

import { IInvoice } from 'services/invoices';
import { formatDate, formatDateRange } from 'utils/date';

import { FaLink } from 'components/utils/fa';
import { MoneyAmount } from 'components/utils/money';
import Status from './status';

interface IOwnProps {
  invoice: IInvoice;
}

type IProps =  RouteComponentProps<{}> & IOwnProps;

class InvoicesTableRow extends React.PureComponent<IProps> {
  private handleClick = (e: React.MouseEvent) => {
    if (e.defaultPrevented) { return; }

    const { invoice, history, location: { search } } = this.props;
    history.push({ search, pathname: `/invoices/${invoice.id}` });
  }

  public render() {
    const { invoice } = this.props;

    return (
      <tr
        className={ invoice.isCompleted ? 'text-muted' : '' }
        onClick={ this.handleClick }
      >
        <td className="text-center"><Status invoice={ invoice } /></td>
        <td>{ invoice.customerName }</td>
        <td>{ formatDateRange(invoice.startsAt, invoice.endsAt) }</td>
        <td><MoneyAmount amount={ invoice.amount } /></td>
        <td>{ formatDate(invoice.sentAt) }</td>
        <td>{ formatDate(invoice.paidAt) }</td>
        <td className="text-center">
          <FaLink
            to={ `/invoices/${invoice.id}/edit` }
            icon="edit"
            title="Edit Invoice"
          />
        </td>
      </tr>
    );
  }
}

export default withRouter<IProps>(InvoicesTableRow);

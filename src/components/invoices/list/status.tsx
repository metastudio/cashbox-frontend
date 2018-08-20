import * as React from 'react';

import { IInvoice } from 'services/invoices';

interface IProps {
  invoice: IInvoice;
}

const InvoiceStatus: React.SFC<IProps> = ({ invoice }) => {
  if (invoice.isCompleted) {
    return <i className="fa fa-check text-success" />;
  }

  if (invoice.isOverdue) {
    return <i className="fa fa-exclamation-triangle text-warning" />;
  }

  return null;
};

export default InvoiceStatus;

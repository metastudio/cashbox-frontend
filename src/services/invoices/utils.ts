import { formatDateRange } from 'utils/date';

import { IInvoice } from './types';

const formatInvoiceTitle = (invoice?: IInvoice): string | null => {
  if (!invoice) { return null; }

  const invoiceNumber = invoice.number ? `#${invoice.number}` : '';

  return `Invoice ${invoiceNumber} ${invoice.customerName} from ${formatDateRange(invoice.startsAt, invoice.endsAt)}`;
};

export { formatInvoiceTitle };

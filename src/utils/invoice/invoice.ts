import { Invoice } from 'model-types';
import { formatDate } from 'utils/date';

const invoiceDateRange = (invoice: Invoice): string => {
  return `${formatDate(invoice.startsAt)} — ${formatDate(invoice.endsAt)}`;
};

export { invoiceDateRange };

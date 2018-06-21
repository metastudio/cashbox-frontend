import * as Moment from 'moment';

const formatDate = (date: Date | undefined): string => {
  return date ? Moment(date).format('L') : '';
};

const formatDateRange = (startDate: Date | undefined, endDate: Date | undefined): string => {
  return `${formatDate(startDate)} — ${formatDate(endDate)}`;
};

export { formatDate, formatDateRange };

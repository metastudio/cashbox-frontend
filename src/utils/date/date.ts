import * as Moment from 'moment';

/**
 * Format date in current locale.
 * @param date - Date object or date string which may be parsed by Moment.js.
 */
const formatDate = (date: Date | undefined): string => {
  return date ? Moment(date).format('L') : '';
};

/**
 * Format date to format used by date picker input.
 * @param date - Date object or date string which may be parsed by Moment.js.
 */
const formatDateValue = (date: Date | string | undefined): string => {
  return date ? Moment(date).format('YYYY-MM-DD') : '';
};

/**
 * Format date range with current locale.
 * @param startDate - Date object or date string which may be parsed by Moment.js.
 * @param endDate - Date object or date string which may be parsed by Moment.js.
 */
const formatDateRange = (startDate: Date | undefined, endDate: Date | undefined): string => {
  return `${formatDate(startDate)} — ${formatDate(endDate)}`;
};

export { formatDate, formatDateValue, formatDateRange };

import * as Moment from 'moment';

const formatDate = (date: Date | undefined): string => {
  return date ? Moment(date).format('L') : '';
};

export { formatDate };

import * as React from 'react';

import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { parseQuery, stringifyQuery } from 'utils/url-helpers';

interface IHeader {
  field:  string;
  title: string;
}

interface ISort {
  title?: string;
  field:  string;
  order:  'asc' | 'desc';
}

type IProps = RouteComponentProps<{}>;

const headers: IHeader[] = [
  { field: 'customer_name', title: 'Customer' },
  { field: 'ends_at',       title: 'Date range' },
  { field: 'amount_cents',  title: 'Invoice total' },
  { field: 'sent_at',       title: 'Sent date' },
  { field: 'paid_at',       title: 'Paid date' },
];

const ASC_SYMBOL  = '▼';
const DESC_SYMBOL = '▲';

class InvoicesTableHeader extends React.PureComponent<IProps> {
  private toggleOrder = (order: string) => order === 'asc' ? 'desc' : 'asc';

  private queryToSort = (query: any): ISort => {
    const sortParam = query.q && query.q.s;
    if (!sortParam) {
      return { field: 'ends_at', order: 'desc' };
    }

    const [field, order] = sortParam.split(' ');
    return { field, order };
  }

  private sortToQuery = (sort: ISort) => ({ q: { s: `${sort.field} ${sort.order}` } });

  private prepareTitle = (sort: ISort, current: ISort) => {
    if (current.field !== sort.field) {
      return sort.title;
    }

    return `${sort.title} ${sort.order === 'asc' ? ASC_SYMBOL : DESC_SYMBOL}`;
  }

  private renderHeaders = () => {
    const { location: { pathname, search } } = this.props;
    const query = parseQuery(search);
    const current = this.queryToSort(query);

    return headers.map((header) => {
      const sort: ISort = {
        ...header,
        order: current.field === header.field ? this.toggleOrder(current.order) : 'asc',
      };

      return (
        <th key={ sort.field }>
          <Link to={ { pathname, search: stringifyQuery({ ...query, ...this.sortToQuery(sort) }) } }>
            { this.prepareTitle(sort, current) }
          </Link>
        </th>
      );
    });
  }

  public render() {
    return(
      <thead>
        <tr>
          <th />
          { this.renderHeaders() }
          <th />
        </tr>
      </thead>
    );
  }
}

export default withRouter(InvoicesTableHeader);

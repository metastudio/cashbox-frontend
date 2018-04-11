import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import * as QS from 'query-string';

type Props = RouteComponentProps<{}>;

const headers = [
  { sort: 'customerName', title: 'Customer' },
  { sort: 'endsAt', title: 'Date range' },
  { sort: 'amountCents', title: 'Invoice total' },
  { sort: 'sentAt', title: 'Sent date' },
  { sort: 'paidAt', title: 'Paid date' },
];

const InvoicesTableHeader: React.SFC<Props> = ({ location: { pathname, search } }) => {
  const sortParam: string | undefined = QS.parse(search)['q[s]'];

  const toggleSortIndex = (sortIndex: string) => sortIndex === 'asc' ? 'desc' : 'asc';

  const prepareLink = (sort: string): string => {
    let order = 'asc';
    if (sortParam && sortParam.includes(sort)) {
      order = toggleSortIndex(sortParam.split(' ')[1]);
    } else if (sort === 'endsAt') {
      order = 'desc';
    }

    return `${pathname}?q[s]=${sort}+${order}`;
  };

  const prepareTitle = ({ title, sort }: { title: string, sort: string }): string => {
    const ascRender = '▼';
    const descRender = '▲';
    if (sortParam && sortParam.includes(sort)) {
      const sortIndex = sortParam.split(' ')[1];
      if (sortIndex === 'asc') {
        return(`${title} ${ascRender}`);
      } else {
        return(`${title} ${descRender}`);
      }
    } else if (!sortParam && sort === 'endsAt') {
      return(`${title} ${ascRender}`);
    } else {
      return(title);
    }
  };

  const renderHeaders = headers.map((header) => (
    <th key={ header.sort }>
      <Link to={ prepareLink(header.sort) } >
        { prepareTitle(header) }
      </Link>
    </th>
  ));

  return(
    <thead>
      <tr>
        { renderHeaders }
        <th />
      </tr>
    </thead>
  );
};

export default withRouter(InvoicesTableHeader);

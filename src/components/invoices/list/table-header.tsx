import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  unpaid: boolean;
  s: string;
}

const InvoicesTableHeader: React.SFC<Props> = ({ unpaid, s }) => {
  const toggleSortIndex = (sortIndex: string) => {
    if (sortIndex === 'asc') {
      return('desc');
    } else {
      return('asc');
    }
  };

  const prepareLink = (sort: string) => {
    let link = `/invoices?q[s]=${sort}`;
    if (s && s.includes(sort)) {
      const sortIndex = s.split(' ')[1];
      link = `${link}+${toggleSortIndex(sortIndex)}`;
    } else if (sort === 'ends_at') {
      link = `${link}+desc`;
    } else {
      link = `${link}+asc`;
    }

    if (unpaid) {
      return(`${link}&q[unpaid]=true`);
    } else {
      return(link);
    }
  };

  const prepareTitle = ({ title, sort }: { title: string, sort: string }) => {
    const ascRender = '▼';
    const descRender = '▲';
    if (s && s.includes(sort)) {
      const sortIndex = s.split(' ')[1];
      if (sortIndex === 'asc') {
        return(`${title} ${ascRender}`);
      } else {
        return(`${title} ${descRender}`);
      }
    } else if (!s && sort === 'ends_at') {
      return(`${title} ${ascRender}`);
    } else {
      return(title);
    }
  };

  const headers = [
    { sort: 'customer_name', title: 'Customer' },
    { sort: 'ends_at', title: 'Date range' },
    { sort: 'amount_cents', title: 'Invoice total' },
    { sort: 'sent_at', title: 'Sent date' },
    { sort: 'paid_at', title: 'Paid date' },
  ];

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

export default InvoicesTableHeader;

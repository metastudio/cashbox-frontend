import * as React from 'react';
import { Pagination } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as QS from 'query-string';

import { Pagination as PaginationInterface } from 'model-types';

interface OwnProps {
  data: PaginationInterface;
}

type Redirect = (page: number) => void;

type Props = OwnProps & RouteComponentProps<{}>;

const first = (redirect: Redirect, current: number) => {
  if (current <= 1) { return null; }
  return(
    <Pagination.First onClick={ () => redirect(1) }>
      « First
    </Pagination.First>
  );
};

const prev = (redirect: Redirect, previous?: number) => {
  if (!previous) { return null; }
  return(
    <Pagination.Prev onClick={ () => redirect(previous) }>
      ‹ Prev
    </Pagination.Prev>
  );
};

const nextPage = ( redirect: Redirect, next?: number) => {
  if (!next) { return null; }
  return(
    <Pagination.Next onClick={ () => redirect(next) } >
      Next ›
    </Pagination.Next>
  );
};

const last = (redirect: Redirect, current: number, pages: number) => {
  if (current === pages) { return null; }
  return(
    <Pagination.Last onClick={ () => redirect(pages) } >
      Last »
    </Pagination.Last>
  );
};

const PaginationRender: React.SFC<Props> = ({ data, history, location: { pathname, search } }) => {
  const { current, previous, pages, next } = data;

  if (pages === 1) { return null; }

  const redirect = (page: number) => {
    const query = QS.parse(search);
    const url = `${pathname}?${QS.stringify({ ...query, page: page })}`;
    history.push(url);
  };

  const all = Array.from(Array(pages).keys()).map((page: number) => {
    const pageElement = page + 1;
    if (pageElement === current ) {
      return(
        <Pagination.Item active key={ page } >
          { pageElement }
        </Pagination.Item>
      );
    }
    return(
      <Pagination.Item key={ page } onClick={ () => redirect(pageElement) }>
        { pageElement }
      </Pagination.Item>
    );
  });

  return(
    <Pagination>
      { first(redirect, current) }
      { prev(redirect, previous) }
      { all }
      { nextPage(redirect, next) }
      { last(redirect, current, pages) }
    </Pagination>
  );
};

export default withRouter(PaginationRender);

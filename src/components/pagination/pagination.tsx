import * as React from 'react';
import { Pagination } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Pagination as PaginationInterface } from 'model-types';

interface Props {
  data: PaginationInterface;
}

type Redirect = (page: number) => void;

type FullProps = Props & RouteComponentProps<{}>;

const first = (redirect: Redirect, current: number) => {
  if (current > 1) {
    return(
      <Pagination.First onClick={ () => redirect(1) }>
        « First
      </Pagination.First>
    );
  }
  return false;
};

const prev = (redirect: Redirect, previous?: number) => {
  if (previous) {
    return(
      <Pagination.Prev onClick={ () => redirect(previous) }>
        ‹ Prev
      </Pagination.Prev>
    );
  } 
  return false;
};

const nextPage = ( redirect: Redirect, next?: number) => {
  if (next) {
    return(
      <Pagination.Next onClick={ () => redirect(next) } >
        Next ›
      </Pagination.Next>
    );
  } 
  return false;
};

const last = (redirect: Redirect, current: number, pages: number) => {
  if (current !== pages) {
    return(
      <Pagination.Last onClick={ () => redirect(pages) } >
        Last »
      </Pagination.Last>
    );
  } 
  return false;
};

const PaginationRender: React.SFC<FullProps> = ({ data, history, location: { pathname } }) => {
  const { current, previous, pages, next } = data;
  if (pages === 1) { return null; }
  const redirect = (page: number) => {
    const url = `${pathname}?page=${page}`;
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

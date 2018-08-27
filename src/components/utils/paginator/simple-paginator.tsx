import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Pager } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { IPagination } from 'model-types';
import { locationWithKeys } from 'utils/url-helpers';

interface IOwnProps {
  data: IPagination;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IRouteProps;

class SimplePaginator extends React.PureComponent<IProps> {
  private locationWithPage = (page: number) => {
    const { location } = this.props;
    return locationWithKeys(location, { page });
  }

  private prevPageItem = () => {
    const { data: { previous } } = this.props;
    if (!previous) { return null; }

    return (
      <LinkContainer to={ this.locationWithPage(previous) }>
        <Pager.Item previous>
          &larr; Previous Page
        </Pager.Item>
      </LinkContainer>
    );
  }

  private nextPageItem = () => {
    const { data: { next } } = this.props;
    if (!next) { return null; }

    return (
      <LinkContainer to={ this.locationWithPage(next) }>
        <Pager.Item next>
          Next Page &rarr;
        </Pager.Item>
      </LinkContainer>
    );
  }

  public render() {
    return (
      <Pager>
        { this.prevPageItem() }
        { this.nextPageItem() }
      </Pager>
    );
  }
}

export default withRouter<IOwnProps & IRouteProps>(SimplePaginator);

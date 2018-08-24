import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Pager } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import * as QS from 'query-string';
import { IPagination } from 'model-types';

interface IOwnProps {
  data: IPagination;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IRouteProps;

class SimplePaginator extends React.PureComponent<IProps> {
  private location = (page: number) => {
    const { location: { pathname, search } } = this.props;
    const query = QS.parse(search);

    return { pathname, search: QS.stringify({ ...query, page }) };
  }

  private prevPageItem = () => {
    const { data: { previous } } = this.props;
    if (!previous) { return null; }

    return (
      <LinkContainer to={ this.location(previous) }>
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
      <LinkContainer to={ this.location(next) }>
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

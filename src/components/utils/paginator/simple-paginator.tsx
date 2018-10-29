import * as React from 'react';

import { Pager } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps, withRouter  } from 'react-router-dom';

import { IPagination } from 'model-types';
import { locationWithKeys } from 'utils/url-helpers';

interface IOwnProps {
  data:           IPagination;
  inverse?:       boolean;
  nextPageLabel?: string;
  prevPageLabel?: string;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IRouteProps;

class SimplePaginator extends React.PureComponent<IProps> {
  public static defaultProps = {
    nextPageLabel: 'Next Page →',
    prevPageLabel: '← Previous Page',
  };

  private nextPage = () => {
    const { inverse, data: { next, previous } } = this.props;

    return inverse ? previous : next;
  }

  private prevPage = () => {
    const { inverse, data: { next, previous } } = this.props;

    return inverse ? next : previous;
  }

  private locationWithPage = (page: number) => {
    const { location } = this.props;
    return locationWithKeys(location, { page });
  }

  private prevPageItem = () => {
    const previous = this.prevPage();
    if (previous === undefined || previous === null) { return null; }

    return (
      <LinkContainer to={ this.locationWithPage(previous) }>
        <Pager.Item previous>
          { this.props.prevPageLabel }
        </Pager.Item>
      </LinkContainer>
    );
  }

  private nextPageItem = () => {
    const next = this.nextPage();
    if (next === undefined || next === null) { return null; }

    return (
      <LinkContainer to={ this.locationWithPage(next) }>
        <Pager.Item next>
          { this.props.nextPageLabel }
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

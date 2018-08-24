import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { IPagination } from 'model-types';
import { locationWithKeys } from 'utils/url-helpers';

interface IOwnProps {
  data:         IPagination;
  newPathname?: string;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IRouteProps;

class Paginator extends React.PureComponent<IProps> {
  private locationWithPage = (page: number) => {
    const { location } = this.props;
    return locationWithKeys(location, { page });
  }

  private firstPageItem = () => {
    if (this.props.data.current <= 1) { return null; }

    return (
      <li key="first">
        <Link to={ this.locationWithPage(1) }>«&nbsp;First</Link>
      </li>
    );
  }

  private prevPageItem = () => {
    if (!this.props.data.previous) { return null; }

    return (
      <li key="prev">
        <Link to={ this.locationWithPage(this.props.data.previous) }>‹&nbsp;Prev</Link>
      </li>
    );
  }

  private pageItem = (page: number) => (
    <li key={ page } className={ page === this.props.data.current ? 'active' : undefined }>
      <Link to={ this.locationWithPage(page) }>{ page }</Link>
    </li>
  )

  private nextPageItem = () => {
    if (!this.props.data.next) { return null; }

    return (
      <li key="next">
        <Link to={ this.locationWithPage(this.props.data.next) }>Next&nbsp;›</Link>
      </li>
    );
  }

  private lastPageItem = () => {
    const { data: { current, pages } } = this.props;

    if (!pages) { return null; }
    if (current >= pages) { return null; }

    return (
      <li key="last">
        <Link to={ this.locationWithPage(pages) }>Last&nbsp;»</Link>
      </li>
    );
  }

  public render() {
    const { data: { pages } } = this.props;

    if (!pages ||  pages <= 1) { return null; }

    const items = [];

    items.push(this.firstPageItem());
    items.push(this.prevPageItem());

    for (let i = 1; i <= pages; i += 1) {
      items.push(this.pageItem(i));
    }

    items.push(this.nextPageItem());
    items.push(this.lastPageItem());

    return (
      <nav>
        <ul className="pagination">
          { items }
        </ul>
      </nav>
    );
  }
}

export default withRouter<IOwnProps & IRouteProps>(Paginator);

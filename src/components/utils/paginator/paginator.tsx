import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import * as QS from 'query-string';

import { IPagination } from 'model-types';

interface IOwnProps {
  data:         IPagination;
  newPathname?: string;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IRouteProps;

class Paginator extends React.PureComponent<IProps> {
  private location = (page: number) => {
    const { location: { pathname, search } } = this.props;
    const query = QS.parse(search);

    return { pathname, search: QS.stringify({ ...query, page }) };
  }

  private firstPageItem = () => {
    if (this.props.data.current <= 1) { return null; }

    return (
      <li key="first">
        <Link to={ this.location(1) }>«&nbsp;First</Link>
      </li>
    );
  }

  private prevPageItem = () => {
    if (!this.props.data.previous) { return null; }

    return (
      <li key="prev">
        <Link to={ this.location(this.props.data.previous) }>‹&nbsp;Prev</Link>
      </li>
    );
  }

  private pageItem = (page: number) => (
    <li key={ page } className={ page === this.props.data.current ? 'active' : undefined }>
      <Link to={ this.location(page) }>{ page }</Link>
    </li>
  )

  private nextPageItem = () => {
    if (!this.props.data.next) { return null; }

    return (
      <li key="next">
        <Link to={ this.location(this.props.data.next) }>Next&nbsp;›</Link>
      </li>
    );
  }

  private lastPageItem = () => {
    if (this.props.data.current >= this.props.data.pages) { return null; }

    return (
      <li key="last">
        <Link to={ this.location(this.props.data.pages) }>Last&nbsp;»</Link>
      </li>
    );
  }

  public render() {
    const { data: { pages } } = this.props;

    if (pages <= 1) { return null; }

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

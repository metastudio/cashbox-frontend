import * as React from 'react';

import { isEmpty } from 'lodash';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { IPagination } from 'model-types';
import { ITransaction, ITransactionsFilter, selectTransactionsQueryFilter } from 'services/transactions';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import { SimplePaginator } from 'components/utils/paginator';

import TransactionsFilter from './filter/filter';
import Table from './list/table';
import TransactionsProvider from './providers/transactions';
import TransactionsSummary from './summary';

interface IStateProps {
  filter: ITransactionsFilter;
}

interface IState {
  isFilterOpened: boolean;
}

type IUpperProps = RouteComponentProps<{}> & ICurrentOrgIdProps;
type IProps = IUpperProps & IStateProps;

class TransactionsList extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isFilterOpened: false,
  };

  private handleToggleFilter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState({ isFilterOpened: !this.state.isFilterOpened });
  }

  private renderToggleFilter = () => (
    <small>
      <a href="#" onClick={ this.handleToggleFilter } title="Filter">
        <i className="fa fa-filter" />
      </a>
    </small>
  )

  private renderTransactions = (
    transactions: ITransaction[],
    pagination:   IPagination | null,
  ) => (
    <>
      <Table transactions={ transactions } />
      { pagination && <SimplePaginator data={ pagination } /> }
    </>
  )

  public componentDidMount() {
    this.setState({
      isFilterOpened: !isEmpty(this.props.filter),
    });
  }

  public componentDidUpdate() {
    if (!this.state.isFilterOpened && !isEmpty(this.props.filter)) {
      this.setState({
        isFilterOpened: !isEmpty(this.props.filter),
      });
    }
  }

  public render() {
    const { orgId, location: { search }, filter } = this.props;

    return (
      <>
        <PageHeader>
          <Link
            to={ { search, pathname: '/transactions/new' } }
            className="btn btn-default pull-right"
          >
            New Transaction...
          </Link>
          Transactions&nbsp;{ this.renderToggleFilter() }
        </PageHeader>
        <TransactionsFilter open={ this.state.isFilterOpened } filter={ filter } />
        <TransactionsProvider orgId={ orgId } search={ search }>
          { this.renderTransactions }
        </TransactionsProvider>
        { !isEmpty(this.props.filter) && <TransactionsSummary orgId={ orgId } search={ search } /> }
      </>
    );
  }
}

const mapState = (_state: {}, props: IUpperProps) => ({
  filter: selectTransactionsQueryFilter(props.location.search),
});

export default withRouter(withCurrentOrgId<IUpperProps>(
  connect<IStateProps, {}, IUpperProps>(mapState)(TransactionsList),
));

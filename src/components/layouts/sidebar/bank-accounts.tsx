import * as React from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { Status } from 'model-types';
import {
  loadVisibleBankAccounts,
  selectVisibleBankAccountsCurrencies,
  selectVisibleBankAccountsStatus,
} from 'services/bank-accounts';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import BankAccountsTable from './bank-accounts-table';

interface IStateProps {
  orgId?:     number;
  status:     Status;
  currencies: string[];
}

interface IDispatchProps {
  load: typeof loadVisibleBankAccounts.request;
}

type Props = IStateProps & IDispatchProps;

class BankAccounts extends React.Component<Props> {
  private loadData = (props: Props) => {
    const { orgId, load } = this.props;
    if (orgId) {
      load(orgId);
    }
  }

  private renderNewBankAccountIcon = () => (
    <small>
      <Link to="/bank_accounts/new" title="New Bank Acoount"><i className="fa fa-plus" /></Link>
    </small>
  )

  public componentDidMount() {
    this.loadData(this.props);
  }

  public componentDidUpdate(prevProps: Props) {
    const { status, orgId } = this.props;
    if (status === Status.Invalid || orgId !== prevProps.orgId) {
      this.loadData(this.props);
    }
  }

  public render() {
    const { orgId, status, currencies } = this.props;

    if (!orgId) { return null; }

    return (
      <>
        <PageHeader>
          Accounts&nbsp;{ this.renderNewBankAccountIcon() }
        </PageHeader>
        <LoadingView status={ status }>
          { () => currencies.map(c => <BankAccountsTable key={ c } currency={ c } />) }
        </LoadingView>
      </>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  orgId:      selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
  status:     selectVisibleBankAccountsStatus(state),
  currencies: selectVisibleBankAccountsCurrencies(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: orgId => dispatch(loadVisibleBankAccounts.request(orgId)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(BankAccounts);

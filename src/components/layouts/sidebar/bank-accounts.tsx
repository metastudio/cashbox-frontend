import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';

import { Status } from 'model-types';
import {
  loadVisibleBankAccounts,
  selectVisibleBankAccountsStatus,
  selectVisibleBankAccountsCurrencies
} from 'services/bank-accounts';
import { selectCurrentOrganizationId } from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import BankAccountsTable from './bank-accounts-table';

interface StateProps {
  orgId?:     number;
  status:     Status;
  currencies: string[];
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = StateProps & DispatchProps;

class BankAccounts extends React.Component<Props> {
  loadData = (props: Props) => {
    const { orgId, load } = this.props;
    if (orgId) {
      load(orgId);
    }
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentDidUpdate(prevProps: Props) {
    const { status, orgId } = this.props;
    if (status === Status.Invalid || orgId !== prevProps.orgId) {
      this.loadData(this.props);
    }
  }

  render() {
    const { orgId, status, currencies } = this.props;

    if (!orgId) { return null; }

    return (
      <>
        <PageHeader>Accounts</PageHeader>
        <LoadingView status={ status }>
          { () => currencies.map((c) => <BankAccountsTable key={ c } currency={ c } />) }
        </LoadingView>
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:        selectCurrentOrganizationId(state),
  status:       selectVisibleBankAccountsStatus(state),
  currencies:   selectVisibleBankAccountsCurrencies(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number) => dispatch(loadVisibleBankAccounts(orgId)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(BankAccounts);

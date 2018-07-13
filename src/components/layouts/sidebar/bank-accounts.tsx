import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { PageHeader } from 'react-bootstrap';

import { Status } from 'model-types';
import {
  BankAccount,
  loadBankAccounts,
  selectBankAccounts,
  selectBankAccountsStatus
} from 'services/bank-accounts';
import { selectCurrentOrganizationId } from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import BankAccountsTable from './bank-accounts-table';

interface StateProps {
  orgId?:        number;
  status:        Status;
  bankAccounts?: BankAccount[];
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
    const { orgId, status, bankAccounts } = this.props;

    if (!orgId) { return null; }
    if (status !== Status.Success || !bankAccounts) {
      return <LoadingView status={ status } />;
    }

    return (
      <>
        <PageHeader>Accounts</PageHeader>
        <BankAccountsTable bankAccounts={ bankAccounts } />
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:        selectCurrentOrganizationId(state),
  bankAccounts: selectBankAccounts(state),
  status:       selectBankAccountsStatus(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadBankAccounts(orgId)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(BankAccounts);

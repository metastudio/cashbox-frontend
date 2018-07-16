import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';

import { Status } from 'model-types';
import { selectCurrentOrganizationId } from 'services/organizations';
import { BankAccount, selectBankAccounts, selectBankAccountsStatus, loadBankAccounts } from 'services/bank-accounts';

import Table from './list/table';
import LoadingView from 'components/utils/loading-view';

interface StateProps {
  orgId:        number;
  status:       Status;
  bankAccounts: BankAccount[] | null;
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = StateProps & DispatchProps;

class BankAccountsList extends React.Component<Props> {
  loadData = () => {
    const { orgId, load } = this.props;

    load(orgId);
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { status, bankAccounts } = this.props;

    if (status !== Status.Success || !bankAccounts) {
      return <LoadingView status={ status } />;
    }

    return (
      <>
        <PageHeader>
          <Link to="/bank_accounts/new" className="btn btn-default pull-right">Add Bank Account</Link>
          Bank Accounts
        </PageHeader>
        <Table bankAccounts={ bankAccounts } />
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:        selectCurrentOrganizationId(state),
  status:       selectBankAccountsStatus(state),
  bankAccounts: selectBankAccounts(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadBankAccounts(orgId)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(BankAccountsList);

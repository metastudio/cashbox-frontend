import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { PageHeader } from 'react-bootstrap';

import { Status, BankAccount } from 'model-types';
import { loadBankAccounts } from 'actions/bank-accounts.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectBankAccounts, selectBankAccountsStatus } from 'selectors/bank-accounts.js';

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

  componentWillReceiveProps(props: Props) {
    if (props.status === Status.Invalid || props.orgId !== this.props.orgId) {
      this.loadData(props);
    }
  }

  render() {
    const { orgId, status, bankAccounts } = this.props;

    if (!orgId) { return null; }

    return (
      <>
        <PageHeader>Accounts</PageHeader>
        <LoadingView status={ status }>
          { status === Status.Success && bankAccounts && <BankAccountsTable bankAccounts={ bankAccounts } /> }
        </LoadingView>
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:        getCurrentOrganizationId(state),
  bankAccounts: selectBankAccounts(state),
  status:       selectBankAccountsStatus(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadBankAccounts(orgId)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(BankAccounts);

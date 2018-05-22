import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Table, PageHeader } from 'react-bootstrap';

import { Status, BankAccount } from 'model-types';
import { loadBankAccounts } from 'actions/bank-accounts.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectBankAccounts, selectBankAccountsStatus } from 'selectors/bank-accounts.js';
import { formatMoney } from 'utils/money';
import 'components/transactions/css/default.css';

import LoadingView from 'components/utils/loading-view';
import { formatBankAccountName } from 'utils/bank-account';

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

  colorClass = (bankAccount: BankAccount) => {
    return Number(bankAccount.balance.fractional) > 0 ? 'positive' : 'negative';
  }

  renderBankAccounts = (bankAccounts: BankAccount[]) => {
    return bankAccounts.map((bankAccount) => (
      <tr key={ bankAccount.id }>
        <td>{ formatBankAccountName(bankAccount) }</td>
        <td className={ this.colorClass(bankAccount) }>{ formatMoney(bankAccount.balance) }</td>
      </tr>
    ));
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
        <Table striped responsive id="bankAccounts">
          <thead>
            <tr>
              <th>Account</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            { this.renderBankAccounts(bankAccounts) }
          </tbody>
        </Table>
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

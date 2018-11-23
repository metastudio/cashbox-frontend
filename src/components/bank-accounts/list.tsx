import * as React from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { Status } from 'model-types';
import {
  loadBankAccounts,
  selectBankAccountsCurrencies,
  selectBankAccountsStatus,
} from 'services/bank-accounts';
import { IGlobalState } from 'services/global-state';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';

import Table from './list/table';

interface IStateProps {
  status:     Status;
  currencies: string[];
}

interface IDispatchProps {
  load: typeof loadBankAccounts.request;
}

type IProps = IStateProps & IDispatchProps & ICurrentOrgIdProps;

class BankAccountsList extends React.Component<IProps> {
  private loadData = () => {
    const { orgId, load } = this.props;

    load(orgId);
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(oldProps: IProps) {
    if (this.props.status === Status.Invalid || this.props.orgId !== oldProps.orgId) {
      this.loadData();
    }
  }

  public render() {
    const { currencies } = this.props;

    return (
      <>
        <PageHeader>
          <Link to="/bank_accounts/new" className="btn btn-default pull-right">Add Bank Account</Link>
          Bank Accounts
        </PageHeader>
        { currencies.map(c => <Table key={ c } currency={ c } />) }
      </>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  status:     selectBankAccountsStatus(state),
  currencies: selectBankAccountsCurrencies(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: orgId => dispatch(loadBankAccounts.request(orgId)),
});

export default withCurrentOrgId(
  connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(BankAccountsList),
);

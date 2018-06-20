import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { find } from 'lodash';

import ConvertedDebt from './converted-debt';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { loadDebtors } from 'actions/debtors.js';
import { loadCurrenciesRates } from 'actions/currencies.js';
import { Debtor, Rate } from 'model-types';
import { Money, formatMoney } from 'utils/money';
import { selectRates, selectRatesUpdatedOn } from 'selectors/currencies.js';
import { selectDebtors } from 'selectors/debtors.js';

interface StateProps {
  orgId: number;
  debtors: Debtor[] | null;
  rates: Rate[];
  ratesUpdatedOn: string;
}

interface DispatchProps {
  load: (orgId: number) => void;
  loadRates: () => void;
}

type Props = StateProps & DispatchProps;

class DebtorSidebar extends React.Component<Props> {
  componentDidMount() {
    const { orgId, load, loadRates } = this.props;
    load(orgId);
    loadRates();
  }

  render() {
    if ( this.props.debtors === null || this.props.rates.length === 0 ) {
      return(<p>No debtors</p>);
    }

    const notUsd = (debt: Money) => {
      return debt.currency.isoCode !== 'USD';
    };

    const debtorSums = (indebtedness: Money[]) => {
      return indebtedness.map((debt) => {
        if (Number.parseInt(debt.fractional) === 0) {
          return false;
        }
        if (notUsd(debt)) {
          return(
            <ConvertedDebt
              debt={ debt }
              rates={ this.props.rates }
              to="USD"
              by={ this.props.ratesUpdatedOn }
              key={ debt.currency.isoCode }
            />
          );
        }
        return(<span key={ debt.currency.isoCode }>{ ' ' + formatMoney(debt) + ';' }</span>);
      });
    };

    const debtors = this.props.debtors.map((debtor) =>
      <p key={ debtor.id } >{ debtor.name }: { debtorSums(debtor.indebtedness) }</p>
    );

    const allDebtorsSums = () => {
      let indebtedness: Money[] = [];

      if (this.props.debtors === null ) {
        return <p>no</p>;
      }

      this.props.debtors.forEach(debtor => {
        debtor.indebtedness.forEach(debtorDebt => {
          const sameMoney = find(indebtedness, (debt) => debt.currency.isoCode === debtorDebt.currency.isoCode);
          if ( sameMoney ) {
            sameMoney.fractional = (
              Number.parseInt(sameMoney.fractional) + Number.parseInt(debtorDebt.fractional)
            ).toString();
          } else {
            indebtedness.push(debtorDebt);
          }
        });
      });
      return(
        <p>
          All customers:
          { ' ' }
          { debtorSums(indebtedness) }
        </p>
      );
    };

    return(
      <>
        <h2>Debtor customers</h2>
        { debtors }
        <hr/>
        { allDebtorsSums() }
      </>
    );
  }
}

const mapState = (state: {}) => {
  return({
    orgId: getCurrentOrganizationId(state),
    debtors: selectDebtors(state),
    rates: selectRates(state),
    ratesUpdatedOn: selectRatesUpdatedOn(state),
  });
};

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadDebtors(orgId)),
  loadRates: () => dispatch(loadCurrenciesRates()),
});

export default connect(mapState, mapDispatch)(DebtorSidebar);

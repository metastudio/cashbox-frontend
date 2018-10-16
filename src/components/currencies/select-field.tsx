import * as React from 'react';

import { connect } from 'react-redux';
import Select from 'react-select';
import { Dispatch } from 'redux';
import { WrappedFieldProps } from 'redux-form';

import { Status } from 'model-types';
import {
  loadCurrencies,
  selectCurrencies, selectCurrenciesStatus,
} from 'services/currencies';
import { CurrencyCode } from 'utils/money';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group';
import { ReactSelectStyles } from 'components/utils/form-inputs/react-select-styles';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';
import { IGlobalState } from 'services/global-state';

interface ICurrencyOption {
  label: string;
  value: CurrencyCode;
}

interface IStateProps {
  status:     string;
  currencies: CurrencyCode[];
}

interface IDispatchProps {
  load: typeof loadCurrencies.request;
}

type IProps = WrappedFieldProps & IStateProps & IDispatchProps;

class CurrencySelect extends React.Component<IProps> {
  private loadData = (props: IProps) => {
    if (props.status === Status.Invalid) {
      props.load();
    }
  }

  private handleChange = (value: ICurrencyOption) => {
    this.props.input.onChange(value && value.value);
  }

  private options = (): ICurrencyOption[] => {
    const { status, currencies } = this.props;
    if (status !== Status.Success || !currencies) {
      return [];
    }

    return currencies.map(c => ({ value: c, label: c }));
  }

  public componentDidMount() {
    this.loadData(this.props);
  }

  public componentDidUpdate() {
    this.loadData(this.props);
  }

  public render () {
    const {
      status,
      input,
      meta,
      currencies,
      load,
      ...inputProps
    } = this.props;

    const selectedCurrency = input.value && { label: input.value, value: input.value };

    return (
      <Select<ICurrencyOption>
        isClearable
        { ...inputProps }
        name={ input.name }
        value={ selectedCurrency }
        onChange={ this.handleChange }
        isLoading={ status !== Status.Success }
        options={ this.options() }
        styles={ ReactSelectStyles }
      />
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  status:     selectCurrenciesStatus(state),
  currencies: selectCurrencies(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: () => dispatch(loadCurrencies.request()),
});

const CurrencySelectContainer =
  connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(CurrencySelect);

const HorizontalCurrencySelect = wrapHorizontalFormGroup(CurrencySelectContainer);
const VerticalCurrencySelect   = wrapVerticalFormGroup(CurrencySelectContainer);

export { CurrencySelectContainer as CurrencySelect, HorizontalCurrencySelect, VerticalCurrencySelect };

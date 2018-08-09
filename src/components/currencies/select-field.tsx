import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { Status } from 'model-types';
import {
  Currency,
  loadCurrencies,
  selectCurrenciesStatus, selectCurrencies,
} from 'services/currencies';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

interface ICurrencyOption {
  label: string;
  value: Currency;
}

interface IStateProps {
  status:     string;
  currencies: Currency[] | null;
}

interface IDispatchProps {
  load: () => void;
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

  private styles = () => ({
    menu: (styles: {}) => ({
      ...styles,
      zIndex: 3,
    }),
  })

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
        { ...inputProps }
        name={ input.name }
        value={ selectedCurrency }
        onChange={ this.handleChange }
        isLoading={ status !== Status.Success }
        options={ this.options() }
        styles={ this.styles() }
      />
    );
  }
}

const mapState = (state: {}) => ({
  status:     selectCurrenciesStatus(state),
  currencies: selectCurrencies(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: () => dispatch(loadCurrencies()),
});

const CurrencySelectContainer =
  connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(CurrencySelect);

const HorizontalCurrencySelect = wrapHorizontalFormGroup(CurrencySelectContainer);
const VerticalCurrencySelect   = wrapVerticalFormGroup(CurrencySelectContainer);

export { CurrencySelectContainer as CurrencySelect, HorizontalCurrencySelect, VerticalCurrencySelect };

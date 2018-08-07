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

interface CurrencyOption {
  label: string;
  value: Currency;
}

interface StateProps {
  status:     string;
  currencies: Currency[] | null;
}

interface DispatchProps {
  load: () => void;
}

type Props = WrappedFieldProps & StateProps & DispatchProps;

class CurrencySelect extends React.Component<Props> {
  loadData = (props: Props) => {
    if (props.status === Status.Invalid) {
      props.load();
    }
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentDidUpdate() {
    this.loadData(this.props);
  }

  handleChange = (value: CurrencyOption) => {
    this.props.input.onChange(value && value.value);
  }

  options = (): CurrencyOption[] => {
    const { status, currencies } = this.props;
    if (status !== Status.Success || !currencies) {
      return [];
    }

    return currencies.map(c => ({ value: c, label: c }));
  }

  styles = () => ({
    menu: (styles: {}) => ({
      ...styles,
      zIndex: 3,
    })
  })

  render () {
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
      <Select<CurrencyOption>
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
  connect<StateProps, DispatchProps>(mapState, mapDispatch)(CurrencySelect);

const HorizontalCurrencySelect = wrapHorizontalFormGroup(CurrencySelectContainer);
const VerticalCurrencySelect   = wrapVerticalFormGroup(CurrencySelectContainer);

export { CurrencySelectContainer as CurrencySelect, HorizontalCurrencySelect, VerticalCurrencySelect };

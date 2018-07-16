import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Select, { Option } from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { Status } from 'model-types';
import {
  Currency,
  loadCurrencies,
  selectCurrenciesStatus, selectCurrencies,
} from 'services/currencies';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group.jsx';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

import 'react-select/dist/react-select.css';
import 'components/utils/form-inputs/async-select-fix.css';

interface OwnProps {
  emptyTitle?: string;
}

interface StateProps {
  status:     string;
  currencies: Currency[] | null;
}

interface DispatchProps {
  load: () => void;
}

type Props = OwnProps & WrappedFieldProps & StateProps & DispatchProps;

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

  handleChange = (value: Option<string>) => {
    this.props.input.onChange(value && value.value);
  }

  options = (): Option[] => {
    const { status, currencies, emptyTitle } = this.props;
    if (status !== Status.Success || !currencies) {
      return [];
    }
    return (emptyTitle ? [{ value: '', label: emptyTitle }] : [])
      .concat(currencies.map(c => ({ value: c, label: c })));
  }

  render () {
    const { status, input, meta, ...inputProps } = this.props;

    return (
      <Select
        { ...inputProps }
        name={ input.name }
        value={ String(input.value) }
        onChange={ this.handleChange }
        onBlur={ () => input.onBlur(input.value) }
        isLoading={ status !== Status.Success }
        options={ this.options() }
      />
    );
  }
}

const mapState = (state: {}) => ({
  status:     selectCurrenciesStatus(state),
  currencies: selectCurrencies(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: () => dispatch(loadCurrencies()),
});

const CurrencySelectContainer =
  connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(CurrencySelect);

const HorizontalCurrencySelect = wrapHorizontalFormGroup(CurrencySelectContainer);
const VerticalCurrencySelect   = wrapVerticalFormGroup(CurrencySelectContainer);

export { CurrencySelectContainer as CurrencySelect, HorizontalCurrencySelect, VerticalCurrencySelect };

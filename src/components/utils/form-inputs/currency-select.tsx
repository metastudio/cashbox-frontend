import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { WrappedFieldProps } from 'redux-form';

import { wrapVerticalFormGroup } from './vertical-form-group';
import { wrapHorizontalFormGroup } from './horizontal-form-group';

const CURRENCIES = ['USD', 'RUB', 'EUR'];

const CurrencySelect: React.SFC<WrappedFieldProps> = ({ input, ...inputProps }) => (
  <FormControl { ...inputProps } { ...input } componentClass="select">
    { CURRENCIES.map((c, i) => <option key={ i }value={ c }>{ c }</option>) }
  </FormControl>
);

const VerticalCurrencySelect   = wrapVerticalFormGroup(CurrencySelect);
const HorizontalCurrencySelect = wrapHorizontalFormGroup(CurrencySelect);

export { CurrencySelect, VerticalCurrencySelect, HorizontalCurrencySelect };

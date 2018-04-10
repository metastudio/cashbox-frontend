import React from 'react';
import PropTypes from 'prop-types';
import CurrencyFormInput from 'react-currency-input';

import { wrapHorizontalFormGroup } from './horizontal-form-group.jsx';
import { wrapVerticalFormGroup } from './vertical-form-group.jsx';

export const CurrencyInput = ({ input, label, ...inputProps }) => {
  delete inputProps.meta;

  return (
    <CurrencyFormInput className="form-control" label={ label } value={ input.value } onChange={ input.onChange } { ...inputProps } />
  );
};

CurrencyInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta:  PropTypes.object,
  label: PropTypes.string,
};

const HorizontalCurrencyInput = wrapHorizontalFormGroup(CurrencyInput);
const VerticalCurrencyInput   = wrapVerticalFormGroup(CurrencyInput);

export { HorizontalCurrencyInput, VerticalCurrencyInput };

import React from 'react';
import PropTypes from 'prop-types';
import CurrencyFormInput from 'react-currency-input';

import { defaultMoneyLocale } from 'utils/money';

import { wrapHorizontalFormGroup } from './horizontal-form-group';
import { wrapVerticalFormGroup } from './vertical-form-group';

export const CurrencyInput = ({ input, locale, ...inputProps }) => {
  delete inputProps.meta;

  return (
    <CurrencyFormInput
      className="form-control"
      decimalSeparator={ locale.decimalMark }
      thousandSeparator={ locale.thousandsSeparator }
      precision={ 2 }
      { ...inputProps }
      { ...input }
    />
  );
};

CurrencyInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta:  PropTypes.object,
  locale: PropTypes.shape({
    decimalMark:        PropTypes.string.isRequired,
    thousandsSeparator: PropTypes.string.isRequired,
  }).isRequired,
};

CurrencyInput.defaultProps = {
  locale: defaultMoneyLocale,
};

const HorizontalCurrencyInput = wrapHorizontalFormGroup(CurrencyInput);
const VerticalCurrencyInput   = wrapVerticalFormGroup(CurrencyInput);

export { HorizontalCurrencyInput, VerticalCurrencyInput };

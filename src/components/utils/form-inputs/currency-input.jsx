import React from 'react';
import PropTypes from 'prop-types';
import CurrencyFormInput from 'react-currency-input';

import { defaultMoneyLocale } from 'utils/money';

import { wrapHorizontalFormGroup } from './horizontal-form-group';
import { wrapVerticalFormGroup } from './vertical-form-group';
import { wrapInlineFormGroup } from './inline-form-group';
import { wrapNoLabelFormGroup } from './no-label-form-group';

const CurrencyInput = ({ input, meta, locale, ...inputProps }) => (
  <CurrencyFormInput
    className="form-control"
    decimalSeparator={ locale.decimalMark }
    thousandSeparator={ locale.thousandsSeparator }
    precision={ 2 }
    { ...inputProps }
    { ...input }
  />
);

CurrencyInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta:  PropTypes.object,
  locale: PropTypes.shape({
    decimalMark:        PropTypes.string.isRequired,
    thousandsSeparator: PropTypes.string.isRequired,
  }),
};

CurrencyInput.defaultProps = {
  locale: defaultMoneyLocale,
};

const HorizontalCurrencyInput = wrapHorizontalFormGroup(CurrencyInput);
const VerticalCurrencyInput   = wrapVerticalFormGroup(CurrencyInput);
const InlineCurrencyInput     = wrapInlineFormGroup(CurrencyInput);
const NoLabelCurrencyInput    = wrapNoLabelFormGroup(CurrencyInput);

export {
  CurrencyInput,
  HorizontalCurrencyInput,
  VerticalCurrencyInput,
  InlineCurrencyInput,
  NoLabelCurrencyInput,
};

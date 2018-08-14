import * as React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { WrappedFieldProps } from 'redux-form';

import { defaultMoneyLocale } from 'utils/money';

import { wrapInlineFormGroup }     from './inline-form-group';
import { wrapHorizontalFormGroup } from './horizontal-form-group';
import { wrapVerticalFormGroup }   from './vertical-form-group';
import { wrapNoLabelFormGroup } from './no-label-form-group';

type IProps = NumberFormatProps & WrappedFieldProps;

const MoneyInput: React.SFC<IProps> = ({ input, meta, ...inputProps }) => (
  <NumberFormat
    thousandSeparator={ defaultMoneyLocale.thousandsSeparator }
    decimalSeparator={ defaultMoneyLocale.decimalMark }
    decimalScale={ 2 }
    fixedDecimalScale
    allowNegative={ false }
    className="form-control"
    { ...inputProps }
    { ...input }
  />
);

const InlineMoneyInput     = wrapInlineFormGroup<IProps>(MoneyInput);
const HorizontalMoneyInput = wrapHorizontalFormGroup<IProps>(MoneyInput);
const VerticalMoneyInput   = wrapVerticalFormGroup<IProps>(MoneyInput);
const NoLabelMoneyInput    = wrapNoLabelFormGroup<IProps>(MoneyInput);

export {
  MoneyInput,
  InlineMoneyInput,
  HorizontalMoneyInput,
  VerticalMoneyInput,
  NoLabelMoneyInput,
};

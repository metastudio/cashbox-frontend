import * as React from 'react';
import * as moment from 'moment';
import { WrappedFieldProps } from 'redux-form';

import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import { formatDateValue } from 'utils/date';

import { wrapHorizontalFormGroup } from './horizontal-form-group';
import { wrapVerticalFormGroup } from './vertical-form-group';
import { wrapInlineFormGroup } from './inline-form-group';
import { wrapNoLabelFormGroup } from './no-label-form-group';

import 'react-datepicker/dist/react-datepicker.css';
import './date-picker-fixes.css';

interface IOwnProps {
  placeholder?: string;
}

type IProps = IOwnProps & ReactDatePickerProps & WrappedFieldProps;

class DatePickerInput extends React.PureComponent<IProps> {
  private handleChange = (date: moment.Moment | null) => {
    this.props.input.onChange(formatDateValue(date));
  }

  public render() {
    const { input, meta, placeholder, ...inputProps } = this.props;

    const value = input.value ? moment(input.value) : undefined;

    return (
      <DatePicker
        selected={ value }
        onChange={ this.handleChange }
        className="form-control"
        autoComplete="off"
        placeholderText={ placeholder }
        { ...inputProps }
      />
    );
  }
}

const HorizontalDatePicker = wrapHorizontalFormGroup<IProps>(DatePickerInput);
const VerticalDatePicker   = wrapVerticalFormGroup<IProps>(DatePickerInput);
const InlineDatePicker     = wrapInlineFormGroup<IProps>(DatePickerInput);
const NoLabelDatePicker    = wrapNoLabelFormGroup<IProps>(DatePickerInput);

export {
  DatePickerInput,
  HorizontalDatePicker,
  VerticalDatePicker,
  InlineDatePicker,
  NoLabelDatePicker,
};

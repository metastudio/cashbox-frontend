import React from 'react';
import PropTypes from 'prop-types';
// TODO: https://github.com/pushtell/react-bootstrap-date-picker/issues/143
import DatePicker from 'react-16-bootstrap-date-picker';
import * as Moment from 'moment';

import { wrapHorizontalFormGroup } from './horizontal-form-group';
import { wrapVerticalFormGroup } from './vertical-form-group';
import { wrapInlineFormGroup } from './inline-form-group';
import { wrapNoLabelFormGroup } from './no-label-form-group';

const DatePickerInput = ({ input, meta, ...inputProps }) => {
  const dateFormat = Moment.localeData().longDateFormat('L');

  return (
    <DatePicker
      { ...inputProps }
      value={ input.value }
      onChange={ input.onChange }
      dateFormat={ dateFormat }
    />
  );
};

DatePickerInput.propTypes = {
  input:         PropTypes.object.isRequired,
  meta:          PropTypes.object,
};

const HorizontalDatePicker = wrapHorizontalFormGroup(DatePickerInput);
const VerticalDatePicker   = wrapVerticalFormGroup(DatePickerInput);
const InlineDatePicker     = wrapInlineFormGroup(DatePickerInput);
const NoLabelDatePicker    = wrapNoLabelFormGroup(DatePickerInput);

export {
  DatePickerInput,
  HorizontalDatePicker,
  VerticalDatePicker,
  InlineDatePicker,
  NoLabelDatePicker,
};

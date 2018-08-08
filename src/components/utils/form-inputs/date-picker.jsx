import React from 'react';
import PropTypes from 'prop-types';
// TODO: https://github.com/pushtell/react-bootstrap-date-picker/issues/143
import DatePicker from 'react-16-bootstrap-date-picker';
import * as Moment from 'moment';

import { wrapHorizontalFormGroup } from './horizontal-form-group';
import { wrapVerticalFormGroup } from './vertical-form-group';

export const DatePickerInput = ({ input, onValueChange, ...inputProps }) => {
  delete inputProps.meta;
  const dateFormat = Moment.localeData().longDateFormat('L');

  return (
    <DatePicker
      value={ input.value }
      onChange={ onValueChange || input.onChange }
      dateFormat={ dateFormat }
      { ...inputProps }
    />
  );
};

DatePickerInput.propTypes = {
  input:         PropTypes.object.isRequired,
  meta:          PropTypes.object,
  onValueChange: PropTypes.func,
};

const HorizontalDatePicker = wrapHorizontalFormGroup(DatePickerInput);
const VerticalDatePicker   = wrapVerticalFormGroup(DatePickerInput);

export { HorizontalDatePicker, VerticalDatePicker };

import React from 'react';
import PropTypes from 'prop-types';
// TODO: https://github.com/pushtell/react-bootstrap-date-picker/issues/143
import DatePicker from 'react-16-bootstrap-date-picker';

import { wrapHorizontalFormGroup } from './horizontal-form-group.jsx';
import { wrapVerticalFormGroup } from './vertical-form-group.jsx';

export const DatePickerInput = ({ input, onValueChange, ...inputProps }) => {
  delete inputProps.meta;

  return (
    <DatePicker value={ input.value } onChange={ onValueChange || input.onChange } { ...inputProps } />
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

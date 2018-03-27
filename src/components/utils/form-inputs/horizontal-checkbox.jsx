import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

import FormGroup from './horizontal-form-group.jsx'

export const HorizontalCheckbox = ({ field, label, ...inputProps }) => {
  return (
    <FormGroup field={ field }>
      <Checkbox {...inputProps} {...field}>{ label }</Checkbox>
    </FormGroup>
  )
}

HorizontalCheckbox.propTypes = {
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
}

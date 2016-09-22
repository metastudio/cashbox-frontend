import React from 'react'
import { Checkbox } from 'react-bootstrap'

import FormGroup from './horizontal-form-group.jsx'

export const HorizontalCheckbox = ({ field, label, ...inputProps }) => {
  return (
    <FormGroup field={ field }>
      <Checkbox {...inputProps} {...field}>{ label }</Checkbox>
    </FormGroup>
  )
}

HorizontalCheckbox.propTypes = {
  field: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
}

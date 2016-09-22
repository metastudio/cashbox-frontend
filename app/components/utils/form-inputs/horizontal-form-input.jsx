import React from 'react'
import { FormControl } from 'react-bootstrap'

import FormGroup from './horizontal-form-group.jsx'

export const HorizontalFormInput = ({ label, field, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } >
      <FormControl {...inputProps} {...field} />
    </FormGroup>
  )
}

HorizontalFormInput.propTypes = {
  field: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  type:  React.PropTypes.string.isRequired,
}

HorizontalFormInput.defaultProps = {
  type: 'text'
}

import React from 'react'
import { FormControl } from 'react-bootstrap'

import FormGroup from './inline-form-group.jsx'

export const InlineInput = ({ field, label, labelProps, ...inputProps }) => (
  <FormGroup field={ field } label={ label } labelProps={ labelProps } >
    <FormControl {...inputProps} {...field} />
  </FormGroup>
)

InlineInput.propTypes = {
  field:      React.PropTypes.object.isRequired,
  label:      React.PropTypes.string.isRequired,
  type:       React.PropTypes.string.isRequired,
  labelProps: React.PropTypes.object,
}

InlineInput.defaultProps = {
  type: 'text',
}

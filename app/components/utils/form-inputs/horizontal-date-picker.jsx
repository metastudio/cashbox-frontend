import React from 'react'
import DatePicker from 'react-bootstrap-date-picker'

import FormGroup from './horizontal-form-group.jsx'

export const HorizontalDatePicker = ({ label, field, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } >
      <DatePicker value={ field.value } onChange={ field.onChange } { ...inputProps } />
    </FormGroup>
  )
}

HorizontalDatePicker.propTypes = {
  field: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
}

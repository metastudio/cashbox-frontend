import React from 'react'
import DatePicker from 'react-bootstrap-date-picker'

import FormGroup from './vertical-form-group.jsx'

export const VerticalDatePicker = ({ field, label, help, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } help={ help }>
      <DatePicker value={ field.value } onChange={ field.onChange } { ...inputProps } />
    </FormGroup>
  )
}

VerticalDatePicker.propTypes = {
  field: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  help:  React.PropTypes.string
}

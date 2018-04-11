import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'

import FormGroup from './vertical-form-group.jsx'

export const VerticalDatePicker = ({ field, label, help, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } help={ help }>
      <DatePicker value={ field.value } onChange={ field.onChange } { ...inputProps } />
    </FormGroup>
  )
}

VerticalDatePicker.propTypes = {
  field: PropTypes.object.isRequired,
  label: PropTypes.string,
  help:  PropTypes.string
}

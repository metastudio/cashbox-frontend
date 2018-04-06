import React from 'react'
import PropTypes from 'prop-types'
import CurrencyInput from 'react-currency-input'

import FormGroup from './vertical-form-group.jsx'

export const VerticalCurrencyInput = ({ label, field, help, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } help={ help } >
      <CurrencyInput className="form-control" value={ field.value } onChange={ field.onChange } { ...inputProps } />
    </FormGroup>
  )
}

VerticalCurrencyInput.propTypes = {
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  help:  PropTypes.string
}

import React from 'react'
import CurrencyInput from 'react-currency-input'

import FormGroup from './horizontal-form-group.jsx'

export const HorizontalCurrencyInput = ({ label, field, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } >
      <CurrencyInput className="form-control" value={ field.value } onChange={ field.onChange } { ...inputProps } />
    </FormGroup>
  )
}

HorizontalCurrencyInput.propTypes = {
  field: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
}

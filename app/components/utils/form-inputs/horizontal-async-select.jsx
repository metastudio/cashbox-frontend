import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import './async-select-fix.css'

import FormGroup from './horizontal-form-group.jsx'

export const HorizontalAsyncSelect = ({ label, field, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } >
      <Select.Async {...inputProps} name={ field.name } value={ field.value } onChange={ field.onChange } />
    </FormGroup>
  )
}

HorizontalAsyncSelect.propTypes = {
  field:       React.PropTypes.object.isRequired,
  label:       React.PropTypes.string.isRequired,
  loadOptions: React.PropTypes.func.isRequired,
}

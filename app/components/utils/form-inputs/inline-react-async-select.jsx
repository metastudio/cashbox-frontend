import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import './async-select-fix.css'

import FormGroup from './inline-form-group.jsx'

export  const InlineReactAsyncSelect = ({ field, label, labelProps, ...inputProps }) => (
  <FormGroup field={ field } label={ label } labelProps={ labelProps } style={ {width: '100%' } }>
    <Select.Async {...inputProps} name={ field.name } value={ field.value } onChange={ field.onChange } />
  </FormGroup>
)

InlineReactAsyncSelect.propTypes = {
  field:       React.PropTypes.object.isRequired,
  label:       React.PropTypes.string.isRequired,
  loadOptions: React.PropTypes.func.isRequired,
  labelProps:  React.PropTypes.object,
}

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import './async-select-fix.css'

import FormGroup from './horizontal-form-group.jsx'

export const HorizontalAsyncSelect = ({ label, field, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } >
      <Select.Async {...inputProps} name={ field.name } value={ field.value } onChange={ field.onChange } cache={false} />
    </FormGroup>
  )
}

HorizontalAsyncSelect.propTypes = {
  field:       PropTypes.object.isRequired,
  label:       PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
}
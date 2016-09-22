import React from 'react'
import { FormControl } from 'react-bootstrap'

import FormGroup from './horizontal-form-group.jsx'

export const HorizontalFileInput = ({ field, label, ...inputProps }) => {
  const handleChange = (e) => {
    e.preventDefault()

    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = (upload) => {
      const { field } = this.props
      field.onChange(upload.target.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <FormGroup field={ field } label={ label } >
      <FormControl type="file" {...inputProps} {...field} onChange={ handleChange } value={ null } />
    </FormGroup>
  )
}

HorizontalFileInput.propTypes = {
  field: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
}

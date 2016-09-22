import React from 'react'
import {FormControl } from 'react-bootstrap'

import FormGroup from './horizontal-form-group.jsx'

export const HorizontalSelect = ({ field, label, collection, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label }>
      <FormControl componentClass="select" {...inputProps} {...field} >
        {
          collection.map((i) => (
            <option key={ i.value } value={ i.value } >
              { i.label }
            </option>
          ))
        }
      </FormControl>
    </FormGroup>
  )
}

HorizontalSelect.propTypes = {
  field:      React.PropTypes.object.isRequired,
  label:      React.PropTypes.string.isRequired,
  collection: React.PropTypes.array.isRequired,
}

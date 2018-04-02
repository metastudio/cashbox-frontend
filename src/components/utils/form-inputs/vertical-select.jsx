import React from 'react'
import { FormControl } from 'react-bootstrap'

import FormGroup from './vertical-form-group.jsx'
import { domOnlyProps } from 'components/utils/form-inputs'

export const VerticalSelect = ({ field, label, collection, help, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } help={ help }>
      <FormControl componentClass="select" {...inputProps} {...domOnlyProps(field)} >
        {
          collection.map((item, index) => (
            <option key={ index } value={ item.value } >
              { item.label }
            </option>
          ))
        }
      </FormControl>
    </FormGroup>
  )
}

VerticalSelect.propTypes = {
  field:      React.PropTypes.object.isRequired,
  label:      React.PropTypes.string.isRequired,
  collection: React.PropTypes.array.isRequired,
  help:       React.PropTypes.string
}

import React from 'react'
import { Radio } from 'react-bootstrap'

import FormGroup from './horizontal-form-group.jsx'

export const HorizontalRadio = ({ label, field, collection, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } >
      {
        collection.map((i) => (
          <Radio key={ i.value } {...inputProps} value={ i.value } checked={ field.value === i.value } onChange={ field.onChange } >
            { i.label }
          </Radio>
        ))
      }
    </FormGroup>
  )
}

HorizontalRadio.propTypes = {
  field:      React.PropTypes.object.isRequired,
  label:      React.PropTypes.string,
  collection: React.PropTypes.array.isRequired,
}

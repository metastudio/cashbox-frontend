import React from 'react'
import { FormControl } from 'react-bootstrap'

import FormGroup from './horizontal-form-group.jsx'

/* eslint-disable no-unused-vars */
// https://github.com/erikras/redux-form/issues/1249
// TODO: remove once upgraded to redux-form v6, which makes this redundant
export const domOnlyProps = ({
  initialValue,
  autofill,
  onUpdate,
  valid,
  invalid,
  dirty,
  pristine,
  active,
  touched,
  visited,
  autofilled,
  error,
  ...domProps,
}) => domProps
/* eslint-enable no-unused-vars */

export const HorizontalFormInput = ({ label, field, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } >
      <FormControl {...inputProps} {...domOnlyProps(field)} />
    </FormGroup>
  )
}

HorizontalFormInput.propTypes = {
  field: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  type:  React.PropTypes.string.isRequired,
}

HorizontalFormInput.defaultProps = {
  type: 'text'
}

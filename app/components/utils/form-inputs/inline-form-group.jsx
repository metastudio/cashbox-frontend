import React from 'react'
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

const InlineFormGroup = ({ field, label, labelProps, children, ...groupProps }) => (
  <FormGroup controlId={ field.name } validationState={ field.invalid ? 'error' : null } {...groupProps} >
    <ControlLabel {...labelProps} >{ label }</ControlLabel>
    { ' ' }
    { children }
    { field.invalid && <HelpBlock>{ field.error }</HelpBlock> }
  </FormGroup>
)

InlineFormGroup.propTypes = {
  field: React.PropTypes.shape({
    name:    React.PropTypes.string.isRequired,
    invalid: React.PropTypes.bool,
    error:   React.PropTypes.string,
  }).isRequired,
  label:      React.PropTypes.string,
  labelProps: React.PropTypes.object,
  children:   React.PropTypes.node.isRequired,
}

export default InlineFormGroup

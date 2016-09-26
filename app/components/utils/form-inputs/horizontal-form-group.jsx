import React from 'react'
import { Col, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

const HorizontalFormGroup = ({ field, label, children }) => {
  return (
    <FormGroup controlId={ field.name } validationState={ field.invalid ? 'error' : null } >
      { label && <Col componentClass={ ControlLabel } sm={ 3 }>{ label }</Col> }
      <Col smOffset={ label ? null : 3 } sm={ 9 } >
        { children }
        { field.invalid && <HelpBlock>{ field.error }</HelpBlock> }
      </Col>
    </FormGroup>
  )
}

HorizontalFormGroup.propTypes = {
  field: React.PropTypes.shape({
    name:    React.PropTypes.string.isRequired,
    invalid: React.PropTypes.bool,
    error:   React.PropTypes.string,
  }).isRequired,
  label: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
}

export default HorizontalFormGroup

import React from 'react'
import { FormGroup, Col, ControlLabel, HelpBlock } from 'react-bootstrap'

const VerticalFormGroup = ({ field, label, help, children }) => {
  return (
    <FormGroup
      controlId={ field.name }
      validationState={ field.invalid ? 'error' : null }
    >
      <Col sm={ 9 }>
        { label && <Col componentClass={ ControlLabel }>{ label }</Col> }
        { children }
        { field.invalid && <HelpBlock>{ field.error }</HelpBlock> }
        { help && <HelpBlock>{ help }</HelpBlock> }
      </Col>
    </FormGroup>
  )
}

VerticalFormGroup.propTypes = {
  field:    React.PropTypes.object.isRequired,
  label:    React.PropTypes.string,
  help:     React.PropTypes.string,
  children: React.PropTypes.node.isRequired
}

export default VerticalFormGroup

import React from 'react'
import PropTypes from 'prop-types'
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
  field:    PropTypes.object.isRequired,
  label:    PropTypes.string,
  help:     PropTypes.string,
  children: PropTypes.node.isRequired
}

export default VerticalFormGroup

import React from 'react'
import { FormControl, FormGroup, Col, ControlLabel, HelpBlock } from 'react-bootstrap'

import { domOnlyProps } from 'components/utils/form-inputs'

export const VerticalTextInput = ({ field, label, help, ...inputProps }) => {
  return (
    <FormGroup
      controlId={ field.name }
      validationState={ field.invalid ? 'error' : null }
    >
      <Col sm={ 9 }>
        { label && <Col componentClass={ ControlLabel }>{ label }</Col> }
        <FormControl { ...inputProps } { ...domOnlyProps(field) } />
        { field.invalid && <HelpBlock>{ field.error }</HelpBlock> }
        { help && <HelpBlock>{ help }</HelpBlock> }
      </Col>
    </FormGroup>
  )
}

VerticalTextInput.propTypes = {
  field: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  help:  React.PropTypes.string,
  type:  React.PropTypes.string
}

VerticalTextInput.defaultProps = {
  type: 'text'
}

import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, Col, ControlLabel, HelpBlock } from 'react-bootstrap';

import { domOnlyProps } from 'components/utils/form-inputs/horizontal-form-input.jsx';

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
  field: PropTypes.object.isRequired,
  label: PropTypes.string,
  help:  PropTypes.string,
  type:  PropTypes.string
}

VerticalTextInput.defaultProps = {
  type: 'text'
}

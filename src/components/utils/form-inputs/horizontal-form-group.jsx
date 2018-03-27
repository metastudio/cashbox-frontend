import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

const HorizontalFormGroup = ({ field, label, children }) => {
  return (
    <FormGroup controlId={ field.name } validationState={ field.invalid ? 'error' : null } >
      { label && <Col componentClass={ ControlLabel } sm={ 3 }>{ label }</Col> }
      <Col smOffset={ label ? null : 3 } sm={ 9 } >
        { children }
        { field.invalid && <HelpBlock>{ field.error }</HelpBlock> }
      </Col>
    </FormGroup>
  );
};

HorizontalFormGroup.propTypes = {
  field: PropTypes.shape({
    name:    PropTypes.string.isRequired,
    invalid: PropTypes.bool,
    error:   PropTypes.string,
  }).isRequired,
  label:    PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default HorizontalFormGroup;

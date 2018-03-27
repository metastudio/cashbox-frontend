import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

const InlineFormGroup = ({ field, label, labelProps, children, ...groupProps }) => (
  <FormGroup controlId={ field.name } validationState={ field.invalid ? 'error' : null } {...groupProps} >
    <ControlLabel {...labelProps} >{ label }</ControlLabel>
    { ' ' }
    { children }
    { field.invalid && <HelpBlock>{ field.error }</HelpBlock> }
  </FormGroup>
);

InlineFormGroup.propTypes = {
  field: PropTypes.shape({
    name:    PropTypes.string.isRequired,
    invalid: PropTypes.bool,
    error:   PropTypes.string,
  }).isRequired,
  label:      PropTypes.string,
  labelProps: PropTypes.object,
  children:   PropTypes.node.isRequired,
};

export default InlineFormGroup;

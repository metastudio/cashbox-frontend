import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

import FormGroup from './inline-form-group.jsx';

export const InlineInput = ({ field, label, labelProps, ...inputProps }) => (
  <FormGroup field={ field } label={ label } labelProps={ labelProps } >
    <FormControl {...inputProps} {...field} />
  </FormGroup>
);

InlineInput.propTypes = {
  field:      PropTypes.object.isRequired,
  label:      PropTypes.string.isRequired,
  type:       PropTypes.string.isRequired,
  labelProps: PropTypes.object,
};

InlineInput.defaultProps = {
  type: 'text',
};

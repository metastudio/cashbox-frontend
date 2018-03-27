import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './async-select-fix.css';

import FormGroup from './inline-form-group.jsx';

export  const InlineReactAsyncSelect = ({ field, label, labelProps, ...inputProps }) => (
  <FormGroup field={ field } label={ label } labelProps={ labelProps } style={ { width: '100%' } }>
    <Select.Async {...inputProps} name={ field.name } value={ field.value } onChange={ field.onChange } />
  </FormGroup>
);

InlineReactAsyncSelect.propTypes = {
  field:       PropTypes.object.isRequired,
  label:       PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
  labelProps:  PropTypes.object,
};

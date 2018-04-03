import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './async-select-fix.css';

import { wrapInlineFormGroup }     from './inline-form-group.jsx';
import { wrapHorizontalFormGroup } from './horizontal-form-group.jsx';

const AsyncSelect = ({ input, ...inputProps }) => {
  delete inputProps.meta;

  return (
    <Select.Async {...inputProps} name={ input.name } value={ input.value } onChange={ (value) => input.onChange(value && value.value) } onBlur={ () => input.onBlur(input.value) } cache={ {} } />
  );
};

AsyncSelect.propTypes = {
  input:       PropTypes.object.isRequired,
  meta:        PropTypes.object,
  loadOptions: PropTypes.func.isRequired,
};

const InlineAsyncSelect     = wrapInlineFormGroup(AsyncSelect, { style: {width: '100%' } });
const HorizontalAsyncSelect = wrapHorizontalFormGroup(AsyncSelect);

export { InlineAsyncSelect, HorizontalAsyncSelect };

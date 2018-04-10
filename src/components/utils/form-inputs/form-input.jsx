import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

import { wrapInlineFormGroup }     from './inline-form-group.jsx';
import { wrapHorizontalFormGroup } from './horizontal-form-group.jsx';
import { wrapVerticalFormGroup }   from './vertical-form-group.jsx';

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    if (this.props.focusOnMount) {
      this.focus();
    }
  }

  focus() {
    this.input && this.input.focus();
  }

  render() {
    const { input, ...inputProps } = this.props;

    delete inputProps.meta;
    delete inputProps.focusOnMount;

    return (
      <FormControl {...inputProps} {...input} inputRef={ (input) => { this.input = input; } } />
    );
  }
}

FormInput.propTypes = {
  input:        PropTypes.object.isRequired,
  meta:         PropTypes.object,
  type:         PropTypes.string.isRequired,
  focusOnMount: PropTypes.bool,
};

FormInput.defaultProps = {
  type: 'text'
};

const InlineFormInput     = wrapInlineFormGroup(FormInput);
const HorizontalFormInput = wrapHorizontalFormGroup(FormInput);
const VerticalFormInput   = wrapVerticalFormGroup(FormInput);

export { FormInput, InlineFormInput, HorizontalFormInput, VerticalFormInput };

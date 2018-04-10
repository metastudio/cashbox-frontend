import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

const HorizontalFormGroup = ({ input, meta, label, children }) => {
  const error = Array.isArray(meta.error) ? meta.error.join(', ') : meta.error;

  return (
    <FormGroup controlId={ input.name } validationState={ meta.invalid ? 'error' : null } >
      { label && <Col componentClass={ ControlLabel } sm={ 3 }>{ label }</Col> }
      <Col smOffset={ label ? null : 3 } sm={ 9 } >
        { children }
        { meta.invalid && <HelpBlock>{ error }</HelpBlock> }
      </Col>
    </FormGroup>
  );
};

HorizontalFormGroup.propTypes = {
  input: PropTypes.shape({
    name:    PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    error:   PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  }).isRequired,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const wrapHorizontalFormGroup = (Component, groupProps = {}) => {
  class HorizontalFormGroupWrapper extends React.Component {
    render() {
      const { input, meta, label, labelProps, ...props } = this.props;

      return (
        <HorizontalFormGroup input={ input } meta={ meta } label={ label } labelProps={ labelProps } { ...groupProps } >
          <Component input={ input } meta={ meta } {...props} />
        </HorizontalFormGroup>
      );
    }
  }

  HorizontalFormGroupWrapper.propTypes = {
    input:      PropTypes.object.isRequired,
    meta:       PropTypes.object.isRequired,
    label:      PropTypes.string,
    labelProps: PropTypes.object,
  };

  HorizontalFormGroupWrapper.displayName = `HorizontalFormGroupWrapper(${Component.displayName || Component.name || 'Component'})`;

  return HorizontalFormGroupWrapper;
};

export { HorizontalFormGroup as default, wrapHorizontalFormGroup };

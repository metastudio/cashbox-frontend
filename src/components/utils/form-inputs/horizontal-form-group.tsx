import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Col, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

interface OwnProps {
  help?:     string;
  label?:    string;
  required?: boolean;
}

type Props = WrappedFieldProps & OwnProps;

class HorizontalFormGroup extends React.Component<Props> {
  labelBlock = () => {
    const { label, required } = this.props;

    if (!label) { return null; }

    return (
      <Col componentClass={ ControlLabel } sm={ 3 }>
        { label }{ required && <span className="required">*</span> }
      </Col>
    );
  }

  errorBlock = () => {
    const { meta: { invalid, error } } = this.props;

    if (!invalid) { return null; }

    return (
      <HelpBlock>
        { Array.isArray(error) ? error.join(', ') : error }
      </HelpBlock>
    );
  }

  helpBlock = () => {
    const { help } = this.props;

    if (!help) { return null; }

    return <HelpBlock>{ help }</HelpBlock>;
  }

  render () {
    const { input, meta, label, children } = this.props;

    return (
      <FormGroup controlId={ input.name } validationState={ meta.invalid ? 'error' : null } >
        { this.labelBlock() }
        <Col smOffset={ label ? undefined : 3 } sm={ 9 } >
          { children }
          { this.errorBlock() }
          { this.helpBlock() }
        </Col>
      </FormGroup>
    );
  }
}

const wrapHorizontalFormGroup = <P extends WrappedFieldProps>(Component: React.ComponentType<P>, groupProps = {}) => {
  class HorizontalFormGroupWrapper extends React.Component<Props> {
    static displayName = `HorizontalFormGroupWrapper(${Component.displayName || Component.name || 'Component'})`;

    render() {
      const { input, meta, label, required, help, ...props } = this.props;

      return (
        <HorizontalFormGroup
          input={ input }
          meta={ meta }
          label={ label }
          help={ help }
          required={ required }
          { ...groupProps }
        >
          <Component input={ input } meta={ meta } { ...props } />
        </HorizontalFormGroup>
      );
    }
  }

  return HorizontalFormGroupWrapper;
};

export { HorizontalFormGroup as default, wrapHorizontalFormGroup };

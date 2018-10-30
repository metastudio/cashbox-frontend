import * as React from 'react';

import { ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import { WrappedFieldProps } from 'redux-form';

interface IOwnProps {
  help?:     string;
  label?:    string;
  required?: boolean;
}

type IProps = WrappedFieldProps & IOwnProps;

class VerticalFormGroup extends React.Component<IProps> {
  private labelBlock = () => {
    const { label, required } = this.props;

    if (!label) { return null; }

    return (
      <ControlLabel>
        { label }{ required && <span className="required">*</span> }
      </ControlLabel>
    );
  }

  private errorBlock = () => {
    const { meta: { invalid, error } } = this.props;

    if (!invalid) { return null; }

    return (
      <HelpBlock>
        { Array.isArray(error) ? error.join(', ') : error }
      </HelpBlock>
    );
  }

  private helpBlock = () => {
    const { help } = this.props;

    if (!help) { return null; }

    return <HelpBlock>{ help }</HelpBlock>;
  }

  public render() {
    const { input, meta, children } = this.props;

    return (
      <FormGroup controlId={ input.name } validationState={ meta.invalid ? 'error' : null } >
        { this.labelBlock() }
        { children }
        { this.errorBlock() }
        { this.helpBlock() }
      </FormGroup>
    );
  }
}

const wrapVerticalFormGroup = <P extends WrappedFieldProps>(Component: React.ComponentType<P>, groupProps = {}) => {
  // tslint:disable-next-line:max-classes-per-file
  class VerticalFormGroupWrapper extends React.Component<IProps> {
    public static displayName = `VerticalFormGroupWrapper(${Component.displayName || Component.name || 'Component'})`;

    public render() {
      const { input, meta, label, help, required, ...props } = this.props;

      return (
        <VerticalFormGroup
          input={ input }
          meta={ meta }
          label={ label }
          help={ help }
          required={ required }
          { ...groupProps }
        >
          <Component input={ input } meta={ meta } { ...props } />
        </VerticalFormGroup>
      );
    }
  }

  return VerticalFormGroupWrapper;
};

export { VerticalFormGroup as default, wrapVerticalFormGroup };

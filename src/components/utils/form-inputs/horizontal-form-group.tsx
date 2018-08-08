import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Col, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

interface IOwnProps {
  help?:     string;
  label?:    string;
  required?: boolean;
}

type IProps = WrappedFieldProps & IOwnProps;

class HorizontalFormGroup extends React.Component<IProps> {
  private labelBlock = () => {
    const { label, required } = this.props;

    if (!label) { return null; }

    return (
      <Col componentClass={ ControlLabel } sm={ 3 }>
        { label }{ required && <span className="required">*</span> }
      </Col>
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

  public render () {
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
  // tslint:disable-next-line:max-classes-per-file
  class HorizontalFormGroupWrapper extends React.Component<IProps> {
    public static displayName = `HorizontalFormGroupWrapper(${Component.displayName || Component.name || 'Component'})`;

    public render() {
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

export {
  HorizontalFormGroup as default,
  IProps as IHorizontalFormGroupProps,
  wrapHorizontalFormGroup,
};

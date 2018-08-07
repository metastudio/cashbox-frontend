import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Col, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

interface OwnProps {
  help?:  string;
  label?: string;
}

type Props = WrappedFieldProps & OwnProps;

const HorizontalFormGroup: React.SFC<Props> = ({ input, meta, label, help, children }) => {
  const error = Array.isArray(meta.error) ? meta.error.join(', ') : meta.error;

  return (
    <FormGroup controlId={ input.name } validationState={ meta.invalid ? 'error' : null } >
      { label && <Col componentClass={ ControlLabel } sm={ 3 }>{ label }</Col> }
      <Col smOffset={ label ? undefined : 3 } sm={ 9 } >
        { children }
        { meta.invalid && <HelpBlock>{ error }</HelpBlock> }
      </Col>
    </FormGroup>
  );
};

const wrapHorizontalFormGroup = <P extends WrappedFieldProps>(Component: React.ComponentType<P>, groupProps = {}) => {
  class HorizontalFormGroupWrapper extends React.Component<Props> {
    static displayName = `HorizontalFormGroupWrapper(${Component.displayName || Component.name || 'Component'})`;

    render() {
      const { input, meta, label, help, ...props } = this.props;

      return (
        <HorizontalFormGroup input={ input } meta={ meta } label={ label } help={ help } { ...groupProps } >
          <Component input={ input } meta={ meta } { ...props } />
        </HorizontalFormGroup>
      );
    }
  }

  return HorizontalFormGroupWrapper;
};

export { HorizontalFormGroup as default, wrapHorizontalFormGroup };

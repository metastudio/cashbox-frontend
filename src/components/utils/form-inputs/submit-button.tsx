import * as React from 'react';
import { Button, Col } from 'react-bootstrap';

interface Props {
  submitting:       boolean;
  invalid?:         boolean;
  submitFailed?:    boolean;
  submitSucceeded?: boolean;
}

const SubmitButton: React.SFC<Props> = (props) => {
  const {
    children,
    submitting,
    invalid,
    submitSucceeded,
    submitFailed,
    ...buttonProps
  } = props;

  let icon: React.ReactNode = '';
  let bsStyle = 'default';

  if (submitting) {
    icon = <i className="fa fa-spinner fa-spin" aria-hidden="true" />;
  } else {
    if (submitSucceeded) {
      icon = <i className="fa fa-check" aria-hidden="true" />;
      bsStyle = 'success';
    } else if (submitFailed) {
      icon = <i className="fa fa-close" aria-hidden="true" />;
      bsStyle = 'danger';
    }
  }

  return (
    <Button type="submit" bsStyle={ bsStyle } disabled={ invalid || submitting } { ...buttonProps } >
      { icon }
      { icon && ' ' }
      { children }
    </Button>
  );
};

SubmitButton.defaultProps = {
  submitting:      false,
  submitFailed:    false,
  submitSucceeded: false,
};

const HorizontalSubmitButton: React.SFC<Props> = (props) => (
  <Col smOffset={ 3 } sm={ 9 }>
    <SubmitButton { ...props } />
  </Col>
);

export { SubmitButton, HorizontalSubmitButton };
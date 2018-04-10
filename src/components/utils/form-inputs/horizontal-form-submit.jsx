import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup } from 'react-bootstrap';

const HorizontalFormSubmit = ({ children }) => {
  return (
    <Col smOffset={3} sm={9}>
      { children }
    </Col>
  );
};

HorizontalFormSubmit.propTypes = {
  children: PropTypes.node.isRequired,
};

const wrapHorizontalFormSubmit = (Component, submitProps = {}) => {
  class HorizontalFormSubmitWrapper extends React.Component {
    render() {
      const { ...props } = this.props;

      return (
        <HorizontalFormSubmit { ...submitProps } >
          <Component {...props} />
        </HorizontalFormSubmit>
      );
    }
  }

  HorizontalFormSubmitWrapper.propTypes = {
  };

  HorizontalFormSubmitWrapper.displayName = `HorizontalFormSubmitWrapper(${Component.displayName || Component.name || 'Component'})`;

  return HorizontalFormSubmitWrapper;
};

export { HorizontalFormSubmit as default, wrapHorizontalFormSubmit };

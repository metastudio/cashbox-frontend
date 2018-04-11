import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup } from 'react-bootstrap';

const HorizontalFormSubmit = ({ children }) => {
  return (
    <Row>
      <Col smOffset={3} sm={9}>
        { children }
      </Col>
    </Row>
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

import * as React from 'react';

interface IProps {
  title?: string;
}

const Spinner: React.SFC<IProps> = ({ title }) => (
  <span className="spinner">
    <i className="fa fa-spinner fa-spin" aria-hidden="true" />
    &nbsp;{ title }
  </span>
);

Spinner.defaultProps = {
  title: 'Loading...',
};

export default Spinner;

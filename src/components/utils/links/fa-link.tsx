import * as React from 'react';

import { LocationDescriptor } from 'history';
import { Link } from 'react-router-dom';

interface IProps {
  icon:   string;
  to:     LocationDescriptor;
  title?: string;
}

const FaLink: React.SFC<IProps> = ({ to, icon, title }) => {
  return (
    <Link to={ to } title={ title }>
      <i className={ `fa fa-${icon}` } />
    </Link>
  );
};

export default FaLink;

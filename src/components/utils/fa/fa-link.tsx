import * as React from 'react';

import { Link, LinkProps } from 'react-router-dom';

import { Fa, IFaProps  } from 'components/utils/fa';

type IProps = IFaProps & LinkProps;

const FaLink: React.SFC<IProps> = ({ icon, ...linkProps }) => {
  return (
    <Link { ...linkProps }>
      <Fa icon={ icon } />
    </Link>
  );
};

export { FaLink };

import * as React from 'react';

import { Fa, IFaProps  } from 'components/utils/fa';

type IProps = IFaProps & React.HTMLProps<HTMLAnchorElement>;

const FaButton: React.SFC<IProps> = ({ icon, ...anchorProps }) => {
  return (
    <a href="#" role="button" { ...anchorProps }>
      <Fa icon={ icon } />
    </a>
  );
};

export { FaButton };

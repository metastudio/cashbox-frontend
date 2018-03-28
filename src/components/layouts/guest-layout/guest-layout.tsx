import * as React from 'react';
import { Grid } from 'react-bootstrap';

import FlashMessages from 'components/utils/flash-messages';

const GuestLayout: React.SFC<{}> = ({ children }) => (
  <div>
    <Grid fluid>
      <FlashMessages />
      { children }
    </Grid>
  </div>
);

export default GuestLayout;

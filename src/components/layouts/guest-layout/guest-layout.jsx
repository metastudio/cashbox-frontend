import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';

import Footer from 'components/layouts/footer';
import FlashMessages from 'components/utils/flash-messages';

const GuestLayout = ({children}) => (
  <div>
    <Grid fluid>
      <FlashMessages />
      { children }
    </Grid>
    <Footer />
  </div>
)

GuestLayout.propTypes = {
  children: PropTypes.node,
}

export default GuestLayout

import React from 'react';
import { Col, Grid } from 'react-bootstrap';

import AccountWrapper from './account-wrapper.jsx';
import ProfileWrapper from './profile-wrapper.jsx';
import CancelAccount from './cancel-account.jsx';

const Profile = () => {
  return (
    <div className="col-sm-6">
      <h1>Edit User</h1>
      <Grid>
        <Col sm={6}>
          <ProfileWrapper />
          <CancelAccount />
        </Col>
        <Col sm={6}>
          <AccountWrapper />
        </Col>
      </Grid>
    </div>
  );
};

export default Profile;

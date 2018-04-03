import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

import AccountWrapper from './account-wrapper.jsx';
import ProfileWrapper from './profile-wrapper.jsx';
import CancelAccount from './cancel-account.jsx';

const Profile = () => {
  return (
    <div>
      <h1>Edit User</h1>
      <Grid fluid>
        <Row>
          <Col xs={ 6 } md={ 6 }>
            <ProfileWrapper />
            <CancelAccount />
          </Col>
          <Col xs={ 6 } md={ 6 }>
            <AccountWrapper />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Profile;

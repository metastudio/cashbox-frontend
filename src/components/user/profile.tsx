import * as React from 'react';
import { Col } from 'react-bootstrap';

import CancelAccount from './cancel-account';
import EditAccount from './edit-account';
import EditProfile from './edit-profile';

const Profile = () => {
  return (
    <>
      <Col xs={ 12 }>
        <h1>Edit User</h1>
      </Col>
      <Col xs={ 12 } md={ 6 } >
        <EditAccount />
        <CancelAccount />
      </Col>
      <Col xs={ 12 } md={ 6 } >
        <EditProfile />
      </Col>
    </>
  );
};

export default Profile;

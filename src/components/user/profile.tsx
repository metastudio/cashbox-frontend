import * as React from 'react';
import { Col } from 'react-bootstrap';

import AccountWrapper from './account-wrapper.jsx';
import ProfileWrapper from './profile-wrapper.jsx';
import CancelAccount from './cancel-account.jsx';

const Profile = () => {
  return (
    <>
      <Col xs={ 12 }>
        <h1>Edit User</h1>
      </Col>
      <Col xs={ 12 } md={ 6 } >
        <ProfileWrapper />
        <CancelAccount />
      </Col>
      <Col xs={ 12 } md={ 6 } >
        <AccountWrapper />
      </Col>
    </>
  );
};

export default Profile;

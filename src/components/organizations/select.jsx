import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import {
  loadOrganizations,
  selectOrganizations,
  selectOrganizationsStatus,
} from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import OrganizationsList from './list/organizations.jsx';

class SelectOrganization extends React.Component {
  componentDidMount() {
    this.props.loadOrganizations();
  }

  render() {
    const { status, organizations } = this.props;

    if (status !== statuses.SUCCESS || !organizations) {
      return <LoadingView status={ status } />;
    }

    return (
      <Row>
        <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
          <h2 className="text-center">Select organization</h2>
          <OrganizationsList organizations={ organizations } />
          <p className="text-center">or</p>
          <p className="text-center">
            <Button bsStyle="primary" href="/organizations/new">Create a new Organization</Button>
          </p>
        </Col>
      </Row>
    );
  }
}

SelectOrganization.propTypes = {
  loadOrganizations: PropTypes.func.isRequired,
  status:            PropTypes.string.isRequired,
  organizations:     PropTypes.arrayOf(PropTypes.object).isRequired,
};

const select = (state) => ({
  organizations: selectOrganizations(state),
  status:        selectOrganizationsStatus(state),
});

const dispatcher = (dispatch) => ({
  loadOrganizations: () => dispatch(loadOrganizations()),
});

export default connect(select, dispatcher)(SelectOrganization);

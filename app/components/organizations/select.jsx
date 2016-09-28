import React from 'react'
import * as statuses from 'constants/statuses'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'
import { Panel, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'

import { loadOrganizations, setCurrentOrganization, addFlashMessage } from 'actions'

class Select extends React.Component {
  constructor(props) {
    super(props)
    this.handleOrganizationClick = this.handleOrganizationClick.bind(this)
  }

  componentDidMount() {
    this.props.index()
  }

  handleOrganizationClick(organization) {
    this.props.setOrganization(organization.id).then(
      ({error, payload}) => {
        if (error) {
          reject(payload)
        } else {
          this.props.addFlashMessage('Organization ' + organization.name + ' selected.')
          this.props.redirectToRootPage()
        }
      }
    )
  }

  render() {
    const organizations = this.props.organizations.map((organization) => (
      <ListGroupItem key={ organization.id } onClick={ () => this.handleOrganizationClick(organization) }>
        { organization.name } - { organization.defaultCurrency }
      </ListGroupItem>
      )
    )

    return (
      <Row>
        <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
          <Panel>
            <Link to="/organizations/new" className="btn btn-primary">New Organization</Link>
            <ListGroup id="organizations">
              { this.props.status == statuses.SUCCESS && organizations }
            </ListGroup>
          </Panel>
        </Col>
      </Row>
    )
  }
}

Select.propTypes = {
  status:             React.PropTypes.string.isRequired,
  setOrganization:    React.PropTypes.func.isRequired,
  redirectToRootPage: React.PropTypes.func.isRequired,
  addFlashMessage:    React.PropTypes.func.isRequired,
}

const select = (state) => ({
  organizations: state.organizations.items,
  status: state.organizations.status,
})

const dispatcher = (dispatch) => ({
  index:              () => dispatch(loadOrganizations()),
  redirectToRootPage: () => dispatch(routeActions.push('/')),
  setOrganization:    (organizationId) => dispatch(setCurrentOrganization(organizationId)),
  addFlashMessage:    (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(Select)

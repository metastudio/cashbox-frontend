import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Row, Col, PageHeader, Panel } from 'react-bootstrap';

import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { addFlashMessage } from 'actions/flash-messages.js';

import Load from './edit/load';
import Update from './edit/update';

interface StateProps {
  orgId: number;
}

interface DispatchProps {
  message: (msg: string) => void;
}

type Props = RouteComponentProps<{ id: string }> & StateProps & DispatchProps;

class EditCategory extends React.Component<Props> {
  afterUpdate = () => {
    const { message, history } = this.props;

    message('Category successfully updated.');
    history.push('/categories');
  }

  render() {
    const { orgId, match } = this.props;

    return(
      <Row>
        <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
          <PageHeader>Edit Category</PageHeader>
          <Load orgId={ String(orgId) } categoryId={ match.params.id }>
            {
              (category) => (
                <Panel>
                  <Panel.Body>
                    <Update
                      category={ category }
                      afterUpdate={ this.afterUpdate }
                    />
                  </Panel.Body>
                </Panel>
              )
            }
          </Load>
        </Col>
      </Row>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:    getCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  message: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(EditCategory));

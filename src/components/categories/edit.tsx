import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Row, Col, PageHeader, Panel } from 'react-bootstrap';

import { addFlashMessage } from 'actions/flash-messages.js';

import Load from './edit/load';
import Update from './edit/update';

interface DispatchProps {
  message: (msg: string) => void;
}

type Props = RouteComponentProps<{ id: string }> & DispatchProps;

class EditCategory extends React.Component<Props> {
  afterUpdate = () => {
    const { message, history } = this.props;

    message('Category successfully updated.');
    history.push('/categories');
  }

  render() {
    const { match } = this.props;

    return(
      <Row>
        <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
          <PageHeader>Edit Category</PageHeader>
          <Load categoryId={ match.params.id }>
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

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  message: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<{}, DispatchProps>(undefined, mapDispatch)(EditCategory));

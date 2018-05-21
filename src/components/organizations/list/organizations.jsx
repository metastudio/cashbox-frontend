import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import ListItem from './list-item.jsx';

const OrganiationsList = ({ organizations }) => (
  <Panel>
    <ListGroup id="organizations">
      { organizations.map((o) => <ListItem organization={ o } key={ o.id } />) }
    </ListGroup>
  </Panel>
);
export default OrganiationsList;

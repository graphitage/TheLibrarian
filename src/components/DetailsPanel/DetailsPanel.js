import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import DetailsForm from './DetailsForm/DetailsForm';


const detailsPanel = (props) => {
    return (
        <Modal style={{top: '9%', height: '90%'}} onHide={() => props.detailsClosed()} show={props.details}>
            <Modal.Header closeButton>
                <Modal.Title>Extracted Paper Content</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div style={{height:'400px', overflowY:'scroll'}}>
                <DetailsForm/>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.detailsClosed}>Close</Button>
                <Button variant="info" onClick={props.compareWithButtonClicked}>Compare with...</Button>
            </Modal.Footer>
        </Modal>
    )
};


export default detailsPanel;
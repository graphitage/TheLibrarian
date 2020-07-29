import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const baseUrl = 'http://localhost:8000';

const comparisonPanel = (props) => {
    const firstId = props.firstId;
    const secondId = props.secondId;

    console.log(firstId, secondId);

    let similarity = 0;

    if (firstId != undefined && secondId != undefined) {
        fetch(
            baseUrl + '/paper_similarity'
            + '/' + firstId
            + '/' + secondId,
            {
                method: 'GET',
                data: ''
            }
        ).then(result => result.json())
            .then(data => {
                similarity = data['similarity'];
                console.log(similarity);
            });
    }

    return (
        <Modal style={{ top: '9%' }} onHide={() => props.onClose()} show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title>Comparison Result (Similarity)</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h1 style={{ color: '#d1c647', textAlign: 'center' }}>{similarity}</h1>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
};


export default comparisonPanel;
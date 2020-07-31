import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const comparisonPanel = (props) => {
    return (
        <Modal style={{ top: '9%' }} onHide={() => props.onClose()} show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title>Comparison Result (Similarity)</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h1 style={{ color: '#d1c647', textAlign: 'center' }}>{(props.similarityScore * 100).toFixed(2)}%</h1>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
};


export default comparisonPanel;
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import * as actionTypes from '../../store/actions/actionTypes';
import PaperAdderBar from './PaperAdderBar/PaperAdderBar';

const PaperAdder = (props) => {
    const [pdfFileUrl, setPdfFileUrl] = useState(null);
    const [extractedText, setExtractedText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handlePaperSubmitted = async (event) => {
        await sleep(2000);
        setModalIsOpen(true);
    };

    const handleModalClosed = (event) => {
        setModalIsOpen(false);
        props.beyondAccuracyPaperAdded();
        props.paperAdderClosed();
    };

    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "#eef2ff" }}>
            <PaperAdderBar
                setExtractedText={setExtractedText}
                setPdfFileUrl={setPdfFileUrl}
                handlePaperSubmitted={handlePaperSubmitted}
            />
            <div style={{ clear: 'both' }} />
            <div style={{ width: '80%', margin: 'auto', height: '100%' }}>
                <iframe
                    title='TheBestPDFViewer'
                    style={{ width: '49%', float: 'left', height: '100%', maxHeight: '800px' }}
                    src={pdfFileUrl}
                />
                {
                    extractedText !== "" ?
                        <div style={{
                            height: '100%', maxHeight: '800px', width: '49%', float: 'right',
                            padding: '10px', color: 'black', backgroundColor: '#fff',
                            fontSize: '15px', lineHeight: '1', overflowY: 'scroll',
                            fontFamily: 'monospace'
                        }}>
                            <h3>Extracted Text:</h3>
                            <br />
                            {extractedText}
                        </div> :
                        null
                }
            </div>

            <Modal onHide={handleModalClosed} show={modalIsOpen}>
                <Modal.Header closeButton>
                    <Modal.Title>Info</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Your paper contribution is saved. Thanks!
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleModalClosed}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};


const mapDispatchToProps = dispatch => {
    return {
        paperAdderClosed: () => dispatch({ type: actionTypes.CLOSE_PAPER_ADDER }),
        beyondAccuracyPaperAdded: () => dispatch({ type: actionTypes.BEYOND_ACCURACY_PAPER_ADDED })
    };
};


export default connect(null, mapDispatchToProps)(PaperAdder);
import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

import DetailsForm from './DetailsForm/DetailsForm';
import * as actionTypes from '../../store/actions/actionTypes';
import {flaskBaseUrl} from '../../store/actions/utils/http';


const detailsPanel = (props) => {
    const handleFindSimilarsClicked = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const number_of_papers = data.get('quantity');
        const chosen_paper = props.chosen_paper;

        fetch(
            flaskBaseUrl + '/find_similar_papers'
            + '/' + chosen_paper
            + '/' + number_of_papers,
            {
                method: 'GET',
                data: ''
            }
        ).then(response => response.json())
        .then(data => {
            props.setSearchedTitle(undefined);
            props.setSearchedPapers(data);
            props.detailsClosed();
        });
    };
    
    return (
        <Modal style={{ top: '9%', height: '90%' }} onHide={() => props.detailsClosed()} show={props.details}>
            <Modal.Header closeButton>
                <Modal.Title>Extracted Paper Content</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div style={{ height: '400px', overflowY: 'scroll', overflowX: 'hidden' }}>
                    <DetailsForm />
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Nav className="justify-content-center">
                    <Form inline onSubmit={handleFindSimilarsClicked}>
                        <Nav.Item>
                            Amount to find:
                        </Nav.Item>
                        <Nav.Item>
                            <Form.Control type='number' name='quantity' min='0' style={{ width: '100px', margin: '0px 10px', textAlign: 'center'}} required />
                        </Nav.Item>
                        <Nav.Item style={{ margin: '0px 10px' }}>
                            <Button variant='primary' type='submit'>
                                Find Similars
                            </Button>
                        </Nav.Item>
                    </Form>
                </Nav>
            </Modal.Footer>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.detailsClosed}>Close</Button>
                <Button variant="info" onClick={props.compareWithButtonClicked}>Compare with...</Button>
            </Modal.Footer>
        </Modal>
    )
};


const mapStateToProps = state => {
    return {
        chosen_paper: state.ui.graph.chosenPaper
    };
};


const mapDispatchToProps = dispatch => {
    return {
        setSearchedPapers: (paper_titles) => dispatch({ type: actionTypes.SET_SEARCHED_PAPERS, paper_titles: paper_titles})
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(detailsPanel);
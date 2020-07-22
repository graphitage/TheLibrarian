import React, { useState, createRef } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const baseUrl = 'http://localhost:8000';

const PaperAdderBar = (props) => {
    const formRef = createRef();

    const handleExtraction = event => {
        console.log('here');
        event.preventDefault();
        const data = new FormData(event.target);

        console.log(data);

        fetch(baseUrl + '/paper_upload', {
            method: 'POST',
            body: data
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                const extractedText = data.map((line, index) => (
                    <p key={index}>{line}</p>
                ));
                props.setExtractedText(extractedText);
            });
    };

    const onPdfFileChange = (event) => {
        console.log(event.target.files[0]);
        const pdfUrl = URL.createObjectURL(event.target.files[0]);
        props.setPdfFileUrl(pdfUrl);
    };

    const barStyle = { width: '100%', margin: 'auto', backgroundColor: '#758BB9' };
    const formStyle = { display: 'inline-block', width: '100%', margin: '0px', padding: '0px' };
    const inputStyle = { display: 'inline-block', float: 'left', left: '0px', margin: '0px', color: '#000' };
    const submitStyle = { display: 'inline-block', float: 'right', right: '0px', margin: '0px' };

    return (
        <Navbar bg='dark' variant='dark'>
            <Nav className="justify-content-center" variant="pills" defaultActiveKey="/home" style={{ padding: '10px', margin: 'auto' }}>
                <Form inline onSubmit={handleExtraction}>
                    <Nav.Item>
                        <Form.Control name='paper' type='file' style={{ color: '#fff' }} onChange={onPdfFileChange} />
                    </Nav.Item>
                    <Nav.Item style={{margin: '0px 10px'}}>
                        <Button variant='primary' type='submit'>
                            Extract Text
                        </Button>
                    </Nav.Item>
                    <Nav.Item>
                        <Button variant='secondary' onClick={props.handlePaperSubmitted}>
                            Submit Paper
                        </Button>
                    </Nav.Item>
                </Form>
            </Nav>
        </Navbar>
    );
};

export default PaperAdderBar;
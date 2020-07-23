import React, { useRef } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const baseUrl = 'http://localhost:8000';

const PaperAdderBar = (props) => {
    const formRef = useRef(null);

    const handleExtraction = () => {
        let formNode = formRef.current;
        const data = new FormData(formNode);

        fetch(baseUrl + '/paper_upload', {
            method: 'POST',
            body: data
        }).then(response => response.json())
            .then(data => {
                const extractedText = data.map((line, index) => (
                    <p key={index}>{line}</p>
                ));
                props.setExtractedText(extractedText);
            });
    };

    const onPdfFileChange = (event) => {
        const pdfUrl = URL.createObjectURL(event.target.files[0]);
        props.setPdfFileUrl(pdfUrl);
        handleExtraction();
    };

    return (
        <Navbar bg='dark' variant='dark'>
            <Nav className="justify-content-center" variant="pills" defaultActiveKey="/home" style={{ padding: '10px', margin: 'auto' }}>
                <Form inline onSubmit={event => {event.preventDefault()}} ref={formRef}>
                    <Nav.Item>
                        <Form.Control name='paper' type='file' style={{ color: '#fff' }} onChange={onPdfFileChange} />
                    </Nav.Item>
                    <Nav.Item style={{ margin: '0px 10px' }}>
                        <Button variant='primary' onClick={props.handlePaperSubmitted}>
                            Submit Paper
                        </Button>
                    </Nav.Item>
                </Form>
            </Nav>
        </Navbar>
    );
};

export default PaperAdderBar;
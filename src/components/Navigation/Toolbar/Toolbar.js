import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

import * as actionTypes from '../../../store/actions/actionTypes';


const toolbar = (props) => {
  const handleTitleUpdated = (event) => {
    props.setSearchedTitle(event.target.value === '' ?
      undefined :
      event.target.value);
  };

  return (
    <header className="Toolbar">
      <Navbar className="d-flex justify-content-center" bg="dark" variant="dark">
        <Navbar.Brand href="#home" onClick={() => props.logoClicked()} style={{ marginRight: '60px' }}>
          <img alt='logo' src='logo2.png' width='70px' style={{ marginRight: '10px' }} />
        The Librarian
      </Navbar.Brand>
        <Nav variant='pills' className='justify-content-center'>
          <Nav.Item>
            <Nav.Link onClick={() => { props.setSearchedTitle(undefined); props.addPaperClicked() }} style={{ color: '#fff' }}>Add Document</Nav.Link>
          </Nav.Item>

          <Form inline onSubmit={(event) => {event.preventDefault()}}>
            <Nav.Item style={{ marginLeft: '50px' }}>
              <Form.Control
                name='title'
                type='text'
                placeholder='Search Title'
                style={{ width: '300px' }}
                value={props.searchedTitle === undefined ? "" : props.searchedTitle}
                onChange={handleTitleUpdated}
                required
              />
            </Nav.Item>
          </Form>

        </Nav>
      </Navbar>
    </header>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addPaperClicked: () => dispatch({ type: actionTypes.OPEN_PAPER_ADDER }),
    logoClicked: () => dispatch({ type: actionTypes.CLOSE_PAPER_ADDER })
  };
};


export default connect(null, mapDispatchToProps)(toolbar);
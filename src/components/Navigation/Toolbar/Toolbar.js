import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import * as actionTypes from '../../../store/actions/actionTypes';


const toolbar = (props) => (
  <header className="Toolbar">
    <Navbar className="d-flex justify-content-center" bg="dark" variant="dark">
      <Navbar.Brand href="#home" onClick={() => props.logoClicked()} style={{ marginRight: '60px' }}>
        <img alt='logo' src='logo2.png' width='70px' style={{ marginRight: '10px' }} />
        The Librarian
      </Navbar.Brand>
      <Nav variant='pills' className='justify-content-center'>
        <Nav.Item>
          <Nav.Link onClick={() => props.addPaperClicked()} style={{ color: '#fff' }}>Add Paper</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  </header>
)

const mapDispatchToProps = dispatch => {
  return {
    addPaperClicked: () => dispatch({ type: actionTypes.OPEN_PAPER_ADDER }),
    logoClicked: () => dispatch({ type: actionTypes.CLOSE_PAPER_ADDER })
  };
};


export default connect(null, mapDispatchToProps)(toolbar);
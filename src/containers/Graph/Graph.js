import React, { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';


const baseUrl = 'http://localhost:8000';


const Graph = (props) => {
    const outerRef = useRef(null);
    const cytoRef = useRef(null);

    let elements = [];

    fetch(
        baseUrl + '/graph_nodes',
        {
            method: 'GET',
            data: ''
        }
    ).then(response => response.json())
    .then(data => {
        elements = data;
        Graph.cy.elements().remove();
        Graph.cy.add(elements);
    })

    const { detailsMenuHandler, onFetchDetails } = props;
    useEffect(() => {
        var labelStylesheet = 'node {label: data(id); }';
        let str = labelStylesheet;
        Graph.cy.style(str);

        Graph.cy.style()
        .selector('node')
            .style({
            'background-image': 'https://cdn1.iconfinder.com/data/icons/mobile-device/512/doc-document-copy-file-blue-round-512.png',
            'background-fit': 'cover',
            'shape':'circle',
            'width':'200',
            'height':'200',
            'background-image-opacity': 0.5,
        })
        .update() // indicate the end of your new stylesheet so that it can be updated on elements
        ;

        Graph.cy.on('click', 'node', (event) => {
            detailsMenuHandler(event.target._private.data.id);
            onFetchDetails(event.target._private.data.id);
        });
        
    }, [detailsMenuHandler, onFetchDetails])

    return (
        <div ref={outerRef} style={{ height: '100%' }}>
            <CytoscapeComponent ref={cytoRef} cy={(cy) => { Graph.cy = cy }} elements={elements} style={{ width: '100%', height: '100%'  }} />
        </div>
    );

}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDetails: (id) => dispatch(actionCreators.fetchDetails(id))
    }
}

export default connect(null, mapDispatchToProps)(Graph); 
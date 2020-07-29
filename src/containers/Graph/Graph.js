import React, { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { connect } from 'react-redux';
import Cytoscape from 'cytoscape';
import CoseBilkent from 'cytoscape-cose-bilkent';


import * as actionCreators from '../../store/actions/index';

import ContextMenu from '../../components/ContextMenu/ContextMenu';


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

    // const elements2 = [
    //     { data: { id: '1', label: 'Beyond Accuracy -  Behavioral Testing of NLP Models with Checklist' }, position: { x: 100, y: 100 } },
    //     { data: { id: 'güneş', label: 'Separability in Axiomatic Graph Theory' }, position: { x: 100, y: 100 } },
    //     { data: { id: '2', label: 'Deep Bayesian Active Learning with Image Data' }, position: { x: 100, y: 240 } }
    //     { data: { id: '17', label: 'Separability in Axiomatic Graph Theory' }, position: { x: 1000, y: 300 } },
    //     { data: { id: '18', label: 'On the Derivation of Graphs' }, position: { x: 800, y: 450 } },
    //     { data: { id: '1', label: 'Beyond Accuracy -  Behavioral Testing of NLP Models with Checklist' }, position: { x: 1000, y: 300 } }
    // ];

    // console.log(elements2);

    // if (props.beyondAccuracyPaperAdded)
    //     elements2.push(
    //         { data: { id: '1', label: 'Beyond Accuracy -  Behavioral Testing of NLP Models with Checklist' }, position: { x: 1000, y: 300 } }
    //     );

    const { onOpenContextMenu, detailsMenuHandler, onFetchDetails } = props;
    useEffect(() => {
        // var stringStylesheet = 'node[id= "1"], node[id= "2"], node[id= "3"], node[id= "4"], node[id= "5"] { background-color: #161B9C ; label: hey; }';
        var labelStylesheet = 'node {label: data(id); }'
        // var stringStylesheet = 'node[id= "17"], node[id= "2"], node[id= "3"], node[id= "4"], node[id= "5"] { background-color: #161B9C ; }';
        let str = labelStylesheet;
        Graph.cy.style(str);

        Graph.cy.style()
        .selector('node')
            .style({
            'background-image': 'https://cdn1.iconfinder.com/data/icons/mobile-device/512/doc-document-copy-file-blue-round-512.png',
            // 'background-image': 'https://cdn.iconscout.com/icon/free/png-512/note-pencile-memo-pen-notebook-book-write-2-14021.png',
            'background-fit': 'cover',
            'shape':'circle',
            'width':'200',
            'height':'200',
            'background-image-opacity': 0.5,
        })
        .update() // indicate the end of your new stylesheet so that it can be updated on elements
        ;

        Graph.cy.on('cxttapend', 'node', (event) => {
            onOpenContextMenu(event.target._private.data.id);
        });

        Graph.cy.on('click', 'node', (event) => {
            detailsMenuHandler(event.target._private.data.id);
            onFetchDetails(event.target._private.data.id);
        });
        
    }, [onOpenContextMenu, detailsMenuHandler, onFetchDetails])

    

    // const { elements } = props
    // useEffect(() => {
    //     // Graph.cy.elements().remove(); //TODO: causes issues, why was this line added?

    //     Graph.cy.add(
    //         elements
    //     );
    // }, [elements]);

    if (props.clr) { // Clears graph
        Graph.cy.elements().remove();
        props.onSwitchClearGraph(false);
    }

    // console.log(elements2);

    return (
        <div ref={outerRef} style={{ height: '100%' }}>
            <CytoscapeComponent ref={cytoRef} cy={(cy) => { Graph.cy = cy }} elements={elements} style={{ width: '100%', height: '100%'  }} />
            <ContextMenu outerRef={outerRef} />
        </div>
    );

}


const mapStateToProps = state => {
    return {
        clr: state.graph.clearNodes,
        elements: state.graph.elements,
        beyondAccuracyPaperAdded: state.ui.beyondAccuracyPaperAdded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSwitchClearGraph: (isActive) => dispatch(actionCreators.clearNodes(isActive)),
        onFetchDetails: (id) => dispatch(actionCreators.fetchDetails(id)),
        onOpenContextMenu: (nodeId) => dispatch(actionCreators.openContextMenu(nodeId)),
        onCloseContextMenu: () => dispatch(actionCreators.closeContextMenu()),
        onSimpleExpand: (nodeId) => dispatch(actionCreators.simpleExpand(nodeId)),
        onAddElements: (data) => dispatch(actionCreators.addElements(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph); 
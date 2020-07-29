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
        console.log(elements);
        Graph.cy.elements().remove();
        Graph.cy.add(elements);
    })

    const elements2 = [
        // { data: { id: '1', label: 'Beyond Accuracy -  Behavioral Testing of NLP Models with Checklist' }, position: { x: 100, y: 100 } },
        { data: { id: 'güneş', label: 'Separability in Axiomatic Graph Theory' }, position: { x: 100, y: 100 } },
        { data: { id: '2', label: 'Deep Bayesian Active Learning with Image Data' }, position: { x: 100, y: 240 } },
        { data: { id: '3', label: 'Generating Person Images with Appearance-aware Pose Stylizer' }, position: { x: 220, y: 210 } },
        { data: { id: '4', label: 'Solvability in Singular Operator Theory' }, position: { x: 110, y: 170 } },
        { data: { id: '5', label: 'EVERYWHERE CAYLEY, RIGHT-HILBERT, LOBACHEVSKY FACTORS AND PROBLEMS IN SPECTRAL COMBINATORICS' }, position: { x: 240, y: 130 } },
        { data: { id: '6', label: 'Some Continuity Results for Covariant, Affine Polytopes' }, position: { x: 500, y: 500 } },
        { data: { id: '7', label: 'TOTALLY D’ALEMBERT COUNTABILITY FOR TOPOLOGICAL SPACES' }, position: { x: 580, y: 440 } },
        { data: { id: '8', label: 'ON FREE, HOLOMORPHIC HOMEOMORPHISMS' }, position: { x: 455, y: 420 } },
        { data: { id: '9', label: 'Some Existence Results for Contra-Linear Monodromies' }, position: { x: 100, y: 500 } },
        { data: { id: '10', label: 'On the Injectivity of Additive, Pseudo-Naturally Meromorphic, Canonically D’Alembert Subrings' }, position: { x: 195, y: 480 } },
        { data: { id: '11', label: 's-Completely Independent, Isometric Rings over Degenerate Primes' }, position: { x: 130, y: 410 } },
        { data: { id: '12', label: 'ON THE UNIQUENESS OF STANDARD, QUASI-NORMAL, CONTINUOUSLY INTRINSIC LINES' }, position: { x: 300, y: 350 } },
        { data: { id: '13', label: 'Groups over Onto Functors' }, position: { x: 580, y: 90 } },
        { data: { id: '14', label: 'EQUATIONS OF MANIFOLDS AND QUESTIONS OF UNIQUENESS' }, position: { x: 520, y: 160 } },
        { data: { id: '15', label: 'Graphs for a Co-Prime Subset' }, position: { x: 610, y: 220 } },
        { data: { id: '16', label: 'Natural Subrings and the Derivation of Stochastic, Quasi-Weil, Eisenstein Scalars' }, position: { x: 740, y: 150 } },
        // { data: { id: '17', label: 'Separability in Axiomatic Graph Theory' }, position: { x: 1000, y: 300 } },
        { data: { id: '18', label: 'On the Derivation of Graphs' }, position: { x: 800, y: 450 } },
        // { data: { id: '1', label: 'Beyond Accuracy -  Behavioral Testing of NLP Models with Checklist' }, position: { x: 1000, y: 300 } }
    ];

    console.log(elements2);

    if (props.beyondAccuracyPaperAdded)
        elements2.push(
            { data: { id: '1', label: 'Beyond Accuracy -  Behavioral Testing of NLP Models with Checklist' }, position: { x: 1000, y: 300 } }
        );

    const { onOpenContextMenu, detailsMenuHandler, onFetchDetails } = props;
    useEffect(() => {
        // var stringStylesheet = 'node[id= "1"], node[id= "2"], node[id= "3"], node[id= "4"], node[id= "5"] { background-color: #161B9C ; label: hey; }';
        var labelStylesheet = 'node {label: data(id); }'
        // var stringStylesheet = 'node[id= "17"], node[id= "2"], node[id= "3"], node[id= "4"], node[id= "5"] { background-color: #161B9C ; }';
        // var stringStylesheet2 = 'node[id= "6"], node[id= "7"], node[id= "8"] { background-color: #E52424 ; }';
        // var stringStylesheet3 = 'node[id= "9"], node[id= "10"], node[id= "11"] { background-color: #510B7B ; }';
        // var stringStylesheet4 = 'node[id= "12"] { background-color: #8117C0 ; }';
        // // var stringStylesheet5 = 'node[id= "13"], node[id= "14"], node[id= "15"] { background-color: #40C01D ; text-wrap: wrap; text-max-width: 150; }';
        // var stringStylesheet5 = 'node[id= "13"], node[id= "14"], node[id= "15"] { background-color: #40C01D ; }';
        // var stringStylesheet6 = 'node[id= "16"] { background-color: #96AD37 ; }';
        // var stringStylesheet7 = 'node[id= "1"] { background-color: #F3F322 ; }';
        var stringStylesheet8 = 'node[id= "title1"] { background-color: #E57624 ; }';
        var stringStylesheet9 = 'node {text-wrap: ellipsis; text-max-width: 150;}';
        let str = labelStylesheet + stringStylesheet8;
        Graph.cy.style(str);

        Graph.cy.style()
        .selector('node')
            .style({
            'background-image': 'https://cdn1.iconfinder.com/data/icons/mobile-device/512/doc-document-copy-file-blue-round-512.png',
            // 'background-image': 'https://cdn.iconscout.com/icon/free/png-512/note-pencile-memo-pen-notebook-book-write-2-14021.png',
            'background-fit': 'cover',
            'shape':'circle',
            'width':'50',
            'height':'50',
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
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

import { flaskBaseUrl } from '../../store/actions/utils/http';


class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            detailsMenuHandler: props.detailsMenuHandler
        };
    }

    componentDidMount() {
        fetch(
            flaskBaseUrl + '/graph_nodes',
            {
                method: 'GET',
                data: ''
            }
        ).then(response => response.json())
        .then(data => {
            this.setState({
                ...this.state,
                elements: data
            });
            Graph.cy.elements().remove();
            Graph.cy.add(this.state.elements);
        });

        var labelStylesheet = 'node {label: data(id); }';
        let str = labelStylesheet;
        Graph.cy.style(str);

        Graph.cy.style()
        .selector('node')
            .style({
            'background-image': 'https://cdn1.iconfinder.com/data/icons/mobile-device/512/doc-document-copy-file-blue-round-512.png',
            'background-fit': 'cover',
            'width':'200',
            'height':'200',
            'background-image-opacity': 0.5,
        })
        .update() // indicate the end of your new stylesheet so that it can be updated on elements
        ;

        Graph.cy.on('click', 'node', (event) => {
            this.state.detailsMenuHandler(event.target._private.data.id);
        });
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <CytoscapeComponent cy={(cy) => { Graph.cy = cy }} style={{ width: '100%', height: '100%'  }} />
            </div>
        );
    }
}


// const Graph = (props) => {
//     const outerRef = useRef(null);

//     let elements = [];

//     fetch(
//         flaskBaseUrl + '/graph_nodes',
//         {
//             method: 'GET',
//             data: ''
//         }
//     ).then(response => response.json())
//     .then(data => {
//         elements = data;
//         Graph.cy.elements().remove();
//         Graph.cy.add(elements);
//     })

//     const { detailsMenuHandler } = props;
//     useEffect(() => {
//         var labelStylesheet = 'node {label: data(id); }';
//         let str = labelStylesheet;
//         Graph.cy.style(str);

//         Graph.cy.style()
//         .selector('node')
//             .style({
//             'background-image': 'https://cdn1.iconfinder.com/data/icons/mobile-device/512/doc-document-copy-file-blue-round-512.png',
//             'background-fit': 'cover',
//             'width':'200',
//             'height':'200',
//             'background-image-opacity': 0.5,
//         })
//         .update() // indicate the end of your new stylesheet so that it can be updated on elements
//         ;

//         Graph.cy.on('click', 'node', (event) => {
//             detailsMenuHandler(event.target._private.data.id);
//         });

//         return () => {
//             Graph.cy.removeEventListener('click');
//         };
        
//     }, [detailsMenuHandler])

//     return (
//         <div ref={outerRef} style={{ height: '100%' }}>
//             <CytoscapeComponent cy={(cy) => { Graph.cy = cy }} elements={elements} style={{ width: '100%', height: '100%'  }} />
//         </div>
//     );

// }

export default Graph; 
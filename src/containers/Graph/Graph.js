import React from 'react';
import { connect } from 'react-redux';
import CytoscapeComponent from 'react-cytoscapejs';

import { flaskBaseUrl } from '../../store/actions/utils/http';
import * as actionTypes from '../../store/actions/actionTypes';


class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            detailsMenuHandler: props.detailsMenuHandler
        };
    }

    getTitlesWithString(searchedTitle) {
        if (searchedTitle !== undefined) {
            const searchedTitle_lower = searchedTitle.toLowerCase();
            const resulting_titles = [];
            let element;
            for (element of this.state.elements) {
                const title = element.data.id;
                const title_lower = title.toLowerCase();
                if (title_lower.includes(searchedTitle_lower)) {
                    resulting_titles.push(title);
                }
            }
            return resulting_titles;
        }
        // else if (searchedTitle !== '') {
        //     return []
        // }
        else {
            return undefined;
        }
    }

    highlightElements(titles, color) {
        if (titles !== undefined)
        {
            console.log(titles);
            const defaultStylesheet = 'node {label: data(id); background-color: #8af; }';
            let highlightStyle = '';
            let title;
            for (title of titles) {
                console.log(title);
                highlightStyle += "node[id='" + title + "'] { background-color: " + color + "; }";
            }
    
            const str = defaultStylesheet + highlightStyle;
            Graph.cy.style(str);
    
            Graph.cy.style()
                .selector('node')
                .style({
                    'background-image': 'paper_icon.png',
                    'background-fit': 'cover',
                    'width': '200',
                    'height': '200',
                    'background-image-opacity': 1,
                    'font-size': '2em'
                })
                .update()
                ;
        }
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
                console.log(this.state.elements);
            });

        Graph.cy.on('click', 'node', (event) => {
            this.state.detailsMenuHandler(event.target._private.data.id);
        });

        let titlesToHighlight = [];

        if (this.props.highlighted_paper !== undefined) {
            titlesToHighlight = [this.props.highlighted_paper];
            this.props.setHighlightedPaper(undefined);
        }
        console.log(titlesToHighlight);
        this.highlightElements(titlesToHighlight, '#007');
    }

    componentDidUpdate() {
        const titles = this.getTitlesWithString(this.props.searchedTitle);
        this.highlightElements(titles, '#a00');
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <CytoscapeComponent zoom={0.1} pan={{ x: 1920 / 2, y: 1080 / 2 }} cy={(cy) => { Graph.cy = cy }} style={{ width: '100%', height: '100%' }} />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        highlighted_paper: state.ui.graph.highlightedPaper
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setHighlightedPaper: (paper_title) => dispatch({ type: actionTypes.HIGHLIGHT_PAPER_NODE, paper_title: paper_title })
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Graph); 
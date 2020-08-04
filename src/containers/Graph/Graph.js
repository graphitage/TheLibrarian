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

    // highlightElements(titles, color) {
    //     if (titles !== undefined) {
    //         const defaultStylesheet = 'node {label: data(id); background-color: #8af; }';
    //         let highlightStyle = '';
    //         let title;
    //         for (title of titles) {
    //             highlightStyle += "node[id='" + title + "'] { background-color: " + color + "; }";
    //         }

    //         const str = defaultStylesheet + highlightStyle;
    //         Graph.cy.style(str);

    //         Graph.cy.style()
    //             .selector('node')
    //             .style({
    //                 'background-image': 'paper_icon.png',
    //                 'background-fit': 'cover',
    //                 'width': '200',
    //                 'height': '200',
    //                 'background-image-opacity': 1,
    //                 'font-size': '2em',
    //                 'text-wrap': 'wrap',
    //                 'text-max-width': '400px'
    //             })
    //             .update()
    //             ;
    //     }
    // }

    highlightElements() {
        const addedPaperColor = '#0a0';
        const chosenPaperColor = '#ff0';

        const defaultStylesheet = 'node {label: data(id); background-color: #8af; }';

        let chosenPaperStylesheet = '';
        const chosen_paper = this.props.chosen_paper;
        if (chosen_paper !== undefined) {
            chosenPaperStylesheet = 'node[id="' + chosen_paper + '"] { background-color: ' + chosenPaperColor + '; border-color: #000; border-width: 10px; }';
        }

        let searchedPapersStylesheet = '';
        const searched_papers = this.props.searched_papers;
        let paper;
        for (paper of searched_papers) {
            searchedPapersStylesheet += 'node[id="' + paper + '"] { background-color: data(color); }';
        }

        let addedPaperStylesheet = '';
        const added_paper = this.props.added_paper;
        if (added_paper !== undefined) {
            addedPaperStylesheet = 'node[id="' + added_paper + '"] { background-color: ' + addedPaperColor + '; }';
        }

        const str = defaultStylesheet + chosenPaperStylesheet + searchedPapersStylesheet + addedPaperStylesheet;
        Graph.cy.style(str);

        Graph.cy.style()
            .selector('node')
            .style({
                'background-image': 'paper_icon.png',
                'background-fit': 'cover',
                'width': '200',
                'height': '200',
                'background-image-opacity': 1,
                'font-size': '2em',
                'text-wrap': 'wrap',
                'text-max-width': '400px'
            })
            .update();
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
                Graph.cy.add(data);

                const titles = [];
                let element;
                for (element of data) {
                    titles.push(element.data.id);
                }
                this.props.setSearchedPapers(titles);
            });

        Graph.cy.on('click', 'node', (event) => {
            const title = event.target._private.data.id;
            this.state.detailsMenuHandler(title);
            this.props.setChosenPaper(title);
        });

        // let titlesToHighlight = [];

        // if (this.props.added_paper !== undefined) {
        //     titlesToHighlight = [this.props.added_paper];
        //     // this.props.setAddedPaper(undefined);
        // }

        // this.highlightElements(titlesToHighlight, '#007');

        this.highlightElements();
    }

    componentDidUpdate() {
        const searchedTitles = this.getTitlesWithString(this.props.searchedTitle);
        const searched_papers = this.props.searched_papers;
        if (searchedTitles !== undefined) {
            let searchedPapersDidNotChange = true;
            if (searchedTitles.length === searched_papers.length) {
                for (let index = 0; index < searchedTitles.length; index++) {
                    if (searchedTitles[index] !== searched_papers[index]) {
                        searchedPapersDidNotChange = false;
                        break;
                    }
                }
            }
            else {
                searchedPapersDidNotChange = false;
            }
            
            if (!searchedPapersDidNotChange) {
                this.props.setSearchedPapers(searchedTitles);
            }
        }
        // this.highlightElements(titles, '#a00');
        this.highlightElements();
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
        added_paper: state.ui.graph.addedPaper,
        chosen_paper: state.ui.graph.chosenPaper,
        searched_papers: state.ui.graph.searchedPapers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // setAddedPaper: (paper_title) => dispatch({ type: actionTypes.SET_ADDED_PAPER, paper_title: paper_title }),
        setChosenPaper: (paper_title) => dispatch({ type: actionTypes.SET_CHOSEN_PAPER, paper_title: paper_title }),
        setSearchedPapers: (paper_titles) => dispatch({ type: actionTypes.SET_SEARCHED_PAPERS, paper_titles: paper_titles })
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Graph); 
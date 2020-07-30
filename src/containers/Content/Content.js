import React from 'react';
import Graph from '../Graph/Graph';
import { connect } from 'react-redux';
import PaperAdder from '../../components/PaperAdder/PaperAdder';

const Content = (props) => {
    return props.addingPaper ?
        <PaperAdder />:
        <Graph {...props} />;
}

const mapStateToProps = state => {
    return {
        addingPaper: state.ui.paperAdderMenu.isOpen
    };
};

export default connect(mapStateToProps, null)(Content);
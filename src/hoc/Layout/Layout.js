import React, { useState, useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

import SearchMenu from '../../components/Navigation/SearchMenu/SearchMenu';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import DetailsPanel from '../../components/DetailsPanel/DetailsPanel';
// import PaperAdder from '../../components/PaperAdder/PaperAdder'
import ComparisonModal from '../../components/ComparisonPanel/ComparisonPanel';

import classes from './Layout.module.css'
import OptionsMenu from '../../components/OptionsMenu/OptionsMenu';

import * as actionTypes from '../../store/actions/actionTypes';
import { use } from 'cytoscape';


const Layout = (props) => {
    const [searchMenu, setSearch] = useState(false);
    const [optionsMenu, setOptions] = useState(false);
    const [detailsMenu, setdetailsMenu] = useState(false);
    // const [paperAdder, setPaperAdder] = useState(false);
    const [comparisonModal, setComparisonModal] = useState(false);
    const [comparisonNodeSelectionMode, setcomparisonNodeSelectionMode] = useState(false);
    const [nodeId, setNodeId] = useState('');

    let modalNodeId = undefined;

    const comparisonNodeRef = useRef();

    comparisonNodeRef.current = comparisonNodeSelectionMode;

    const searchClosedHandler = useCallback(() => {
        setSearch(false);
    }, [])

    const searchClickedHandler = useCallback(() => {
        setSearch(true);
        setOptions(false);
        setdetailsMenu(false);
        // setPaperAdder(false);
    }, []);

    const optionsClosedHandler = useCallback(() => {
        setOptions(false);
    }, []);

    const optionsClickedHandler = useCallback(() => {
        setOptions(true);
        setSearch(false);
        setdetailsMenu(false);
        // setPaperAdder(false);
    }, []);

    const { switchClearGraph } = props;
    const clearGraph = useCallback(() => {
        switchClearGraph(true);
    }, [switchClearGraph]);

    const detailsPanelOpenedHandler = useCallback((id) => {
        if (comparisonNodeRef.current === false) {
            setdetailsMenu(true);
            setNodeId(id);
            modalNodeId = undefined;
        } else {
            modalNodeId = id;
            console.log(nodeId, modalNodeId);
            setComparisonModal(true);
        }
        setOptions(false);
        setSearch(false);
        // setPaperAdder(false);
        setNodeId(id);
    }, []);

    const detailsPanelClosedHandler = useCallback(() => {
        setdetailsMenu(false);
    }, []);

    // const paperAdderClickedHandler = useCallback(() => {
    //     setPaperAdder(true);
    //     setdetailsMenu(false);
    //     setOptions(false);
    //     setSearch(false);
    // }, []);

    // const paperAdderClosedHandler = useCallback(() => {
    //     setPaperAdder(false);
    // }, []);


    const comparisonModalClosedHandler = useCallback(() => {
        setComparisonModal(false);
        setcomparisonNodeSelectionMode(false);
    }, []);


    const compareWithClickedHandler = useCallback(() => {
        setdetailsMenu(false);
        setcomparisonNodeSelectionMode(true);
    }, []);


    return (
        <React.Fragment>
            <SearchMenu search={searchMenu} searchClosed={searchClosedHandler}></SearchMenu>
            <Toolbar
                searchClick={searchClickedHandler}
                optionsClick={optionsClickedHandler}
                clearGraph={clearGraph}
                // paperAdderClick={paperAdderClickedHandler}
            ></Toolbar>
            <OptionsMenu options={optionsMenu} optionsClosed={optionsClosedHandler}></OptionsMenu>
            <DetailsPanel
                detailsClosed={detailsPanelClosedHandler}
                details={detailsMenu} nodeId={nodeId}
                compareWithButtonClicked={compareWithClickedHandler}
            />
            <ComparisonModal
                show={comparisonModal}
                onClose={comparisonModalClosedHandler}
                firstId={nodeId}
                secondId={modalNodeId}
            ></ComparisonModal>
            {comparisonNodeSelectionMode &&
                <Alert variant="info" style={{ textAlign: "center" }}>
                    <strong>Click the paper that you'd like to compare with...</strong>
                </Alert>
            }
            <main className={classes.Content}>
                {/* <PaperAdder paperAdderClosed={paperAdderClosedHandler} paperAdder={paperAdder}></PaperAdder> */}
                {React.cloneElement(props.children, { detailsMenuHandler: detailsPanelOpenedHandler })}
            </main>
        </React.Fragment>
    );
}


const mapStateToProps = state => {
    return {
        clr: state.graph.clearNodes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchClearGraph: (isActive) => dispatch({ type: actionTypes.CLEAR_NODES, bool: isActive })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout); 
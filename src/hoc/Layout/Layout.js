import React, { useState, useCallback, useRef } from 'react';

import Alert from 'react-bootstrap/Alert';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import DetailsPanel from '../../components/DetailsPanel/DetailsPanel';
// import PaperAdder from '../../components/PaperAdder/PaperAdder'
import ComparisonModal from '../../components/ComparisonPanel/ComparisonPanel';

import classes from './Layout.module.css'


const Layout = (props) => {
    const [detailsMenu, setdetailsMenu] = useState(false);
    const [comparisonModal, setComparisonModal] = useState(false);
    const [comparisonNodeSelectionMode, setcomparisonNodeSelectionMode] = useState(false);
    const [nodeId, setNodeId] = useState('');

    let modalNodeId = undefined;

    const comparisonNodeRef = useRef();

    comparisonNodeRef.current = comparisonNodeSelectionMode;

    const detailsPanelOpenedHandler = useCallback((id) => {
        if (comparisonNodeRef.current === false) {
            setdetailsMenu(true);
            setNodeId(id);
            modalNodeId = undefined;
        } else {
            modalNodeId = id;
            setComparisonModal(true);
        }
        setNodeId(id);
    }, []);

    const detailsPanelClosedHandler = useCallback(() => {
        setdetailsMenu(false);
    }, []);


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
            <Toolbar />
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
                {React.cloneElement(props.children, { detailsMenuHandler: detailsPanelOpenedHandler })}
            </main>
        </React.Fragment>
    );
}

export default Layout; 
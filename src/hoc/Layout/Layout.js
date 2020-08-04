import React, { useState, useCallback, useRef } from 'react';
import { connect } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import DetailsPanel from '../../components/DetailsPanel/DetailsPanel';
import ComparisonModal from '../../components/ComparisonPanel/ComparisonPanel';
import { flaskBaseUrl } from '../../store/actions/utils/http';
import Content from '../../containers/Content/Content';
import * as actionCreators from '../../store/actions/index';


const Layout = (props) => {
    const [detailsMenu, setdetailsMenu] = useState(false);
    const [comparisonModal, setComparisonModal] = useState(false);
    const [comparisonNodeSelectionMode, setcomparisonNodeSelectionMode] = useState(false);
    const [similarityScore, setSimilarityScore] = useState(0);
    const [searchedTitle, setSearchedTitle] = useState(undefined);

    let nodeId = undefined;

    const comparisonNodeRef = useRef();

    comparisonNodeRef.current = comparisonNodeSelectionMode;

    const { onFetchDetails } = props;
    const detailsPanelOpenedHandler = (id) => {
        if (comparisonNodeRef.current === false) {
            setdetailsMenu(true);
            nodeId = id;
            onFetchDetails(id);
        } else {
            if (id !== undefined && nodeId !== undefined) {
                fetch(
                    flaskBaseUrl + '/paper_similarity'
                    + '/' + id
                    + '/' + nodeId,
                    {
                        method: 'GET',
                        data: ''
                    }
                ).then(result => result.json())
                    .then(data => {
                        setSimilarityScore(data['similarity']);
                    })
                setComparisonModal(true);
            }
        }
    };

    const detailsPanelClosedHandler = useCallback(() => {
        setdetailsMenu(false);
    }, []);


    const comparisonModalClosedHandler = useCallback(() => {
        setComparisonModal(false);
        setcomparisonNodeSelectionMode(false);
        setSimilarityScore(0);
    }, []);


    const compareWithClickedHandler = useCallback(() => {
        setdetailsMenu(false);
        setcomparisonNodeSelectionMode(true);
    }, []);


    return (
        <React.Fragment>
            <Toolbar setSearchedTitle={setSearchedTitle} />
            <DetailsPanel
                detailsClosed={detailsPanelClosedHandler}
                details={detailsMenu} nodeId={nodeId}
                compareWithButtonClicked={compareWithClickedHandler}
            />
            <ComparisonModal
                show={comparisonModal}
                similarityScore={similarityScore}
                onClose={comparisonModalClosedHandler}
            ></ComparisonModal>
            {comparisonNodeSelectionMode &&
                <Alert variant="info" style={{ textAlign: "center" }}>
                    <strong>Click the paper that you'd like to compare with...</strong>
                </Alert>
            }
            <Content
                detailsMenuHandler={detailsPanelOpenedHandler}
                searchedTitle={searchedTitle}
            />
        </React.Fragment>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDetails: (id) => dispatch(actionCreators.fetchDetails(id))
    }
}

export default connect(null, mapDispatchToProps)(Layout); 
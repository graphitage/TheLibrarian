import * as actionTypes from './actionTypes';
import httpReq from './utils/http';
import { allPapersElementCreator } from './utils/graphElementCreator';

const baseUrl = 'https://graphitage.herokuapp.com/api.graphitage.com/';


export const clearNodes = (isActive) => {
    return {
        type: actionTypes.CLEAR_NODES,
        bool: isActive
    }
}


const setElements = (elements) => {
    return {
        type: actionTypes.SET_ELEMENTS,
        elements : elements
    }
}

const setError = (bool) => {
    return {
        type: actionTypes.SET_ERROR,
        error: bool
    }
}


// if nodeId is null, then get all the nodes from the server
export const simpleExpand = (nodeId = null) => {
    return (dispatch, getState) => {
        if (nodeId == null) {
            httpReq(baseUrl + 'papers', 'GET')
            .then((result) => {
                if (result.error === true) {
                    dispatch(setError(true))
                } else {
                    const graphElements = allPapersElementCreator(result.data);
                    dispatch(setElements(graphElements))
                }
            })

        }
    }
}


export const addElements = (data) => {
    return (dispatch, getState) => {
        if (data != null) {
            const newGraphElements = allPapersElementCreator(Object.values(data));
            dispatch(setElements(newGraphElements));
        }
    }
}



const expandByKeywords = (nodeId) => {
    // TODO get json and proccess it to create nodes

    return {
        type: actionTypes.SET_ELEMENTS,
        nodes: []
    }
}

const expandByReaders = (nodeId) => {
    // TODO get json and proccess it to create nodes

    return {
        type: actionTypes.SET_ELEMENTS,
        nodes: []
    }
}

const expandByDatasets = (nodeId) => {
    // TODO get json and proccess it to create nodes

    return {
        type: actionTypes.SET_ELEMENTS,
        nodes: []
    }
}
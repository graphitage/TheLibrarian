import * as actionTypes from './actionTypes';



export const openContextMenu = (nodeId) => {
    return {
        type: actionTypes.OPEN_CONTEXT_MENU,
        nodeId: nodeId
    }
}

export const closeContextMenu = () => {
    return {
        type: actionTypes.CLOSE_CONTEXT_MENU,
    }
}



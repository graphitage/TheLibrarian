import * as actionTypes from '../actions/actionTypes';


const initialState = {
    contextMenu: {
        isOpen: false,
        nodeId: ''
    },
    paperAdderMenu: {
        isOpen: false
    },
    beyondAccuracyPaperAdded: false
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.OPEN_CONTEXT_MENU:
            return {
                ...state,
                contextMenu: {
                    isOpen: true,
                    nodeId: action.nodeId
                }
            }
        case actionTypes.CLOSE_CONTEXT_MENU:
            return {
                ...state,
                contextMenu: {
                    isOpen: false,
                    nodeId: ''
                }
            }
        case actionTypes.OPEN_PAPER_ADDER:
            return {
                ...state,
                paperAdderMenu: {
                    isOpen: true
                }
            }
        case actionTypes.CLOSE_PAPER_ADDER:
            return {
                ...state,
                paperAdderMenu: {
                    isOpen: false
                }
            }
        case actionTypes.BEYOND_ACCURACY_PAPER_ADDED:
            return {
                ...state,
                beyondAccuracyPaperAdded: true
            }
        default :
            return state
        
    
    }
}


export default reducer;
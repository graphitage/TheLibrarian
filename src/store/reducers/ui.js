import * as actionTypes from '../actions/actionTypes';


const initialState = {
    paperAdderMenu: {
        isOpen: false
    },
    graph: {
        highlightedPaper: undefined
    }
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.OPEN_PAPER_ADDER:
            return {
                ...state,
                paperAdderMenu: {
                    isOpen: true
                }
            };
        case actionTypes.CLOSE_PAPER_ADDER:
            return {
                ...state,
                paperAdderMenu: {
                    isOpen: false
                }
            };
        case actionTypes.HIGHLIGHT_PAPER_NODE:
            return {
                ...state,
                graph: {
                    highlightedPaper: action.paper_title
                }
            };
        default :
            return state
    }
}


export default reducer;
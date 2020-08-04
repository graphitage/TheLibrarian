import * as actionTypes from '../actions/actionTypes';


const initialState = {
    paperAdderMenu: {
        isOpen: false
    },
    graph: {
        addedPaper: undefined,
        chosenPaper: undefined,
        searchedPapers : []
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
        case actionTypes.SET_ADDED_PAPER:
            return {
                ...state,
                graph: {
                    ...state.graph,
                    addedPaper: action.paper_title
                }
            };
        case actionTypes.SET_CHOSEN_PAPER:
            return {
                ...state,
                graph: {
                    ...state.graph,
                    chosenPaper: action.paper_title
                }
            }
        case actionTypes.SET_SEARCHED_PAPERS:
            return {
                ...state,
                graph: {
                    ...state.graph,
                    searchedPapers: action.paper_titles
                }
            }
        default :
            return state
    }
}


export default reducer;
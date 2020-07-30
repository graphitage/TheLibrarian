import * as actionTypes from '../actions/actionTypes';


const initialState = {
    paperAdderMenu: {
        isOpen: false
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
            }
        case actionTypes.CLOSE_PAPER_ADDER:
            return {
                ...state,
                paperAdderMenu: {
                    isOpen: false
                }
            }
        default :
            return state
    }
}


export default reducer;
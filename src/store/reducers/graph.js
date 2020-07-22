import * as actionTypes from '../actions/actionTypes'

const initialState = {
    clearNodes: false,
    elements: [],
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAR_NODES:
            return {
                ...state,
                elements: [],
                clearNodes: action.bool,
                error: false
            };
        case actionTypes.SET_ELEMENTS:
            return {
                ...state,
                elements: action.elements,
                error: false
            }
        case actionTypes.SET_ERROR:
            return {
                ...state,
                elements: [],
                error: action.error
            }
            
        default:
            return state;
    }
};

export default reducer;
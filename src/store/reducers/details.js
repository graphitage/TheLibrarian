import * as actionTypes from '../actions/actionTypes';


const initialState = {
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.FETCH_DETAILS:
            return {
                ...action.details,
            }
        default :
            return state
        
    
    }
}


export default reducer;
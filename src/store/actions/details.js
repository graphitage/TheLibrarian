import * as actionTypes from './actionTypes';
import httpReq, { flaskBaseUrl } from './utils/http';


const saveDetails = (res) => {
    return {
        type: actionTypes.FETCH_DETAILS,
        details: res
    }
}

export const fetchDetails = (id = 1) => {
    return (dispatch, getState) => {
        httpReq(flaskBaseUrl + '/paper_node/' + id, 'GET')
            .then((result) => {
                dispatch(saveDetails(result.data));
            });
    }
}


import * as actionTypes from './actionTypes';
import httpReq from './utils/http';

const baseUrl = 'http://localhost:8000/';


const saveDetails = (res) => {
    return {
        type: actionTypes.FETCH_DETAILS,
        details: res
    }
}

export const fetchDetails = (id = 1) => {
    return (dispatch, getState) => {
        httpReq(baseUrl + 'paper_node/' + id, 'GET')
        .then((result) => {
                console.log(result.data);
                dispatch(saveDetails(result.data));
            });
    }
}


import {allArrangements, createArrangement, getArrangement, editArrangement, deleteArrangement} from '../util/arrangement_api_util';



export const RECEIVE_ARRANGEMENT = 'RECEIVE_ARRANGEMENT';
export const RECEIVE_ARRANGEMENTS = 'RECEIVE_ARRANGEMENTS';
export const RECEIVE_ARRANGEMENT_ERRORS = 'RECEIVE_ARRANGEMENT_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS';


const receiveArrangement = arrangement => ({
    type: RECEIVE_ARRANGEMENT,
    arrangement
});

const receiveArrangements = arrangements => ({
    type: RECEIVE_ARRANGEMENTS,
    arrangements
});

const receiveErrors = errors => ({
    type: RECEIVE_ARRANGEMENT_ERRORS,
    errors
})

const removeErrors = () => ({
    type: CLEAR_ERRORS
})



export const addArrangement = arrangement => dispatch => createArrangement(arrangement)
    .then(arrangement => dispatch(receiveArrangement(arrangement)),
    error => dispatch(receiveErrors(error.responseJSON)))

export const fetchArrangement = arrangementId => dispatch => getArrangement(arrangementId)
    .then(arrangement => dispatch(receiveArrangement(arrangement)),
    error => dispatch(receiveErrors(error.responseJSON)))


export const fetchAllArrangements = () => dispatch => allArrangements()
    .then(arrangements => dispatch(receiveArrangements(arrangements)),
    error => dispatch(receiveErrors(error.responseJSON)))


export const modifyArrangement = (arrangementId, data) => dispatch => editArrangement(arrangementId, data)
    .then(arrangement => dispatch(receiveArrangement(arrangement)),
        error => dispatch(receiveErrors(error.responseJSON)))


export const destroyArrangement = (arrangementId) => dispatch => deleteArrangement(arrangementId)
    .then(arrangement => dispatch(removeArrangement(arrangement)));


export const clearErrors = () => dispatch => dispatch(removeErrors())

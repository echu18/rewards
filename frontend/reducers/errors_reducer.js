import { RECEIVE_ARRANGEMENT_ERRORS, CLEAR_ERRORS } from '../actions/arrangement_actions';

export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ARRANGEMENT_ERRORS:
            const errors = action.errors;
            return Object.assign({}, errors);
        case CLEAR_ERRORS:
            return {}
        default:
            return state;
    }
}
import {RECEIVE_ARRANGEMENT, RECEIVE_ARRANGEMENTS, RECEIVE_ARRANGEMENT_ERRORS} from '../actions/arrangement_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ARRANGEMENT:
            return Object.assign({}, state, action.arrangement)

            case RECEIVE_ARRANGEMENTS:
                const arrangements = {}
                action.arrangements.forEach(product => {
                    return arrangements[product.id] = product;
                });
                return arrangements;
        default:
            return state;
    }
}
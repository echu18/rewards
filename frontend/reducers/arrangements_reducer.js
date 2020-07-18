import {RECEIVE_ARRANGEMENT, RECEIVE_ARRANGEMENTS, RECEIVE_ARRANGEMENT_ERRORS} from '../actions/arrangement_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ARRANGEMENT:
            debugger
            return Object.assign({}, state, {[action.arrangement.id]: action.arrangement})

            case RECEIVE_ARRANGEMENTS:
                const arrangements = {}
                action.arrangements.forEach(arrangement => {
                    return arrangements[arrangement.id] = arrangement;
                });
                return arrangements;
        default:
            return state;
    }
}
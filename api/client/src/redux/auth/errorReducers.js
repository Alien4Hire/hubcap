// @flow
import {
    CLEAR_ERRORS,
    GET_ERRORS,   
} from './constants';

const ERROR_STATE = {
    msg: {},
    status: null,
    id: null,
}


const Error = (state: State = ERROR_STATE, action: AuthAction) => {
    switch(action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id,
            }
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id: null,
            }
        default:
            return state;
    }
}

export default Error;
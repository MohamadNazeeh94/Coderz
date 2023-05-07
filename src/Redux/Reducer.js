import { MAKE_REQUEST, FAIL_REQUEST, GET_USER_LIST, DELETE_USER, ADD_USER, EDIT_USER, GET_USER_DETAILS } from "./Actiontype"

const initialstate = {
    loading: true,
    userlist: [],
    userobject: {},
    headers: {},
    errormesage: ''
}

export const Reducer = (state= initialstate, action) => {
    switch(action.type){
        case MAKE_REQUEST:
            return{
                ...state,
                loading: true
            }
        case FAIL_REQUEST:
            return{
                ...state,
                loading: false,
                errormesage: action.payload
            }
        case GET_USER_LIST:
            return{
                loading: false,
                errormesage: '',
                userlist: action.payload,
                headers: action.header,
                userobject: {}
            }
        case DELETE_USER:
            return{
                ...state,
                loading: false,
            }
        case ADD_USER:
            return{
                ...state,
                loading: false,
            }
        case EDIT_USER:
            return{
                ...state,
                loading: false,
            }
        case GET_USER_DETAILS:
            return{
                ...state,
                loading: false,
                userdetails: action.payload
            }
        default: return state
    }
}
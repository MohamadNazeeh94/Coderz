import axios from "axios"
import { toast } from "react-toastify"
import { MAKE_REQUEST, FAIL_REQUEST, GET_USER_LIST, DELETE_USER, ADD_USER, EDIT_USER, GET_USER_DETAILS } from "./Actiontype"

const makeRequest = () => {
    return{
        type: MAKE_REQUEST
    }
}

const failRequest = (err) => {
    return{
        type: FAIL_REQUEST,
        payload: err
    }
}

const getUserList = (data, headers) => {
    return{
        type: GET_USER_LIST,
        payload: data,
        header: headers
    }
}

const deleteUser = (id) => {
    return{
        type: DELETE_USER,
        payload: id
    }
}

const addUser = () => {
    return{
        type: ADD_USER
    }
}

const editUser = () => {
    return{
        type: EDIT_USER
    }
}

const getUserDetails = (data) => {
    return{
        type: GET_USER_DETAILS,
        payload: data
    }
}


export const FetchUserList = (page) =>{
    return(dispatch)=>{
        dispatch(makeRequest());
        axios.get('https://gorest.co.in/public/v2/users?page='+ page).then(res=>{
            const userlist=res.data;
            const headers=res.headers;
            dispatch(getUserList(userlist, headers));
        }).catch(err=>{
            dispatch(failRequest(err.message))
        })
    }
}

export const RemoveUser = (id) => {
    return (dispatch) => {
      dispatch(makeRequest());
      axios.delete(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: {
          Authorization: 'Bearer 0ca75b60ac59743bc868e439e23c97855dfb26e4df7ca0abdd20bbfff5b79944',
        },
      })
        .then((res) => {
          dispatch(deleteUser());
          dispatch(FetchUserList()); // dispatch FetchUserList after deleteUser
        })
        .catch((err) => {
          dispatch(failRequest(err.message));
        });
    };
  };

export const AddUser = (data) =>{
    return(dispatch)=>{
        dispatch(makeRequest());
        axios.post('https://gorest.co.in/public/v2/users/',data,
        {'headers': {
            'Authorization': 'Bearer 0ca75b60ac59743bc868e439e23c97855dfb26e4df7ca0abdd20bbfff5b79944'
        }}).then(res=>{
            dispatch(addUser());
            toast.success('User added successfully.')
        }).catch(err=>{
            dispatch(failRequest(err.message))
        })
    }
}

export const EditUser = (data, id) =>{
    return(dispatch)=>{
        dispatch(makeRequest());
        axios.put('https://gorest.co.in/public/v2/users/'+id,data,
        {'headers': {
            'Authorization': 'Bearer 0ca75b60ac59743bc868e439e23c97855dfb26e4df7ca0abdd20bbfff5b79944'
        }}).then(res=>{
            dispatch(editUser());
            toast.success('User updated successfully.')
        }).catch(err=>{
            dispatch(failRequest(err.message))
        })
    }
}

export const FetchUserObj = (id) =>{
    return(dispatch)=>{
        //dispatch(makeRequest());
        axios.get('https://gorest.co.in/public/v2/users/'+ id).then(res=>{
            const userlist=res.data;
            console.log(res)
           // getUserDetails(userlist)
            dispatch(getUserDetails(userlist));
        }).catch(err=>{
            dispatch(failRequest(err.message))
        })
    }
}
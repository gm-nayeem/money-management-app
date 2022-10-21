import Axios from 'axios'
import * as Types from '../actions/types'
import jwt_decode from "jwt-decode";

export const register = (user, history) => dispatch => {
    Axios.post('/api/users/register', user)
        .then((res) => {
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                    error: {}
                }
            })

            console.log(res)
            history.push('/login')
        })
        .catch(err => {
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                    error: err.response.data
                }
            })
        })
}


export const login = (user, history) => dispatch => {
    Axios.post('/api/users/login', user)
        .then(res => {
            let token = res.data.token
            localStorage.setItem('auth_token', token)
            var decoded = jwt_decode(token);

            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: decoded
                }
            })

            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                    error: err.response.data
                }
            })
        })
}
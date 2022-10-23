import Axios from 'axios'
import * as Types from '../actions/types'
import jwt_decode from "jwt-decode";
import setAuthToken from '../../utils/setAuthToken'

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
            setAuthToken(token)
            var decoded = jwt_decode(token);

            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: decoded
                }
            })
            console.log(res.data.message)
            history.push('/')
        })
        .catch(err => {
            //console.log(err.response.data.message)
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                    error: err.response.data
                }
            })
        })
}


export const logout = (history) => {
    localStorage.removeItem('auth_token')
    history.push('/login')

    return {
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    }
}
import Axios from 'axios'
import * as Types from '../actions/types'

export const register = user => dispatch => {

    Axios.post('/api/users/register', user)
        .then((res) => {
            console.log(res)
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                    error: {}
                }
            })

            
           
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


export default register

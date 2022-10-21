import Axios from 'axios'
import * as Types from '../actions/types'

export const register = user => dispatch => {

    Axios.post('/api/users/register', user)
        .then((res) => {
            
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                    error: {}
                }
            })

            console.log(res)
           
        })
        .catch(err => {
            console.log(err.response.data.message)
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                    error: err.response.data
                }
            })
        })
}


export default register

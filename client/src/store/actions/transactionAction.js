import Axios  from "axios"

import * as Types from './types'

export const loadTransactions = () => dispatch => {
    Axios.get('/api/transactions')
        .then(res => {
            dispatch({
                type: Types.LOAD_TRANSACTION,
                payload: {
                    transactions: res.data
                }
            })
        })
        .catch(err => {
            console.log(err);
        });
}

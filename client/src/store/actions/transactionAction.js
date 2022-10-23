import Axios  from "axios"

import * as Types from './types'

export const loadTransactions = () => dispatch => {
    Axios.get('/api/transactions')
        .then(response => {
            dispatch({
                type: Types.LOAD_TRANSACTION,
                payload: {
                    transactions: response.data
                }
            })
        })
        .catch(err => {
            console.log(err);
        });
}


export const addNewTransaction = transaction => dispatch => {
    Axios.post('/api/transactions', transaction)
        .then(response => {
            dispatch({
                type: Types.CREATE_TRANSACTION,
                payload: {
                    transaction: response.data
                }
            })
        })
        .catch(err => {
            console.log(err)
        });
}
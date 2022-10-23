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

export const removeTransaction = id => dispatch => {
    Axios.delete(`/api/transactions/${id}`)
        .then(response => {
            dispatch({
                type: Types.REMOVE_TRANSACTION,
                payload: {
                    id: response.data._id
                }
            })
        })
        .catch(err => {
            console.log(err)
        });
}

export const updateTransaction = (id, transaction) => dispatch => [
    Axios.put(`/api/transactions/${id}`, transaction)
        .then(response => {
            dispatch({
                type: Types.UPDATE_TRANSACTION,
                payload: {
                    transaction: response.data.transaction
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
]
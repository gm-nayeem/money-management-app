import * as Types from '../actions/types'

const transactionReducer = (state=[], action) => {
    switch (action.type) {
        case Types.LOAD_TRANSACTION: {
            return action.payload.transactions
        }

        case Types.CREATE_TRANSACTION: {
            let transactions = [...state]
            transactions.unshift(action.payload.transaction)
            return transactions
        }

        case Types.REMOVE_TRANSACTION: {
            let transactions = [...state]
            return transactions.filter(transaction => {
                return transaction.id !== action.payload.id
            })
        }

        default: return state;
    }
}

export default transactionReducer;
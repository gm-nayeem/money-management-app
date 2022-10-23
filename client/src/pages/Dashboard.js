import React, { Component } from 'react'

import {connect} from 'react-redux'
import { loadTransactions } from '../store/actions/transactionAction'

class Dashboard extends Component {

    componentDidMount() {
        this.props.loadTransactions()
    }

  render() {
    const {auth, transactions} = this.props
    console.log(transactions);
    return (
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
            <h1>Welcome {auth.user.name}</h1>
            <p>Your Email is {auth.user.email}</p>
            <br/>
            <h2>Transactions: </h2>
            <ul className='list-group'>
                {
                    transactions.map(transaction => (
                        <li 
                            key={transaction._id}
                            className='list-group-item'
                        >
                            <p>Type: {transaction.type}</p>
                            <p>Amount: {transaction.amount}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect(mapStateToProps, {loadTransactions})(Dashboard);
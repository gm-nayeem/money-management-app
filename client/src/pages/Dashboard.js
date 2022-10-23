import React, { Component } from 'react'

import {connect} from 'react-redux'
import { loadTransactions } from '../store/actions/transactionAction'
import CreateTransaction from '../components/transactions/CreateTransaction'

class Dashboard extends Component {

    state = {
        modalIsOpen: false
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        })
    }

    componentDidMount() {
        this.props.loadTransactions()
    }

  render() {
    const {auth, transactions} = this.props

    return (
      <div className='row mt-3'>
        <div className='col-md-8 offset-md-2'>
            <h1 className='text-center'>Welcome {auth.user.name}</h1>
            <p className='text-center'>Your Email is <strong style={{color: "green"}}>{auth.user.email}</strong></p>
            
            <button
                className='btn btn-primary'
                onClick={this.openModal}
            >
                Create New Transaction
            </button>
            <CreateTransaction 
                modalIsOpen={this.state.modalIsOpen}
                closeModal={this.closeModal}
            />
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
                            <p>Note: {transaction.note}</p>
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
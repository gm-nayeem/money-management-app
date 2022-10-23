import React, { Component } from 'react'

import {connect} from 'react-redux'
import { loadTransactions, removeTransaction } from '../store/actions/transactionAction'
import CreateTransaction from '../components/transactions/CreateTransaction'
import UpdateTransaction from '../components/transactions/UpdateTransaction'

class Dashboard extends Component {

    state = {
        modalIsOpen: false,
        modalIsUpdate: false,
        id: ''
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

    updateOpenModal = (id) => {
        this.setState({
            modalIsUpdate: true,
            id
        })
    }

    updateCloseModal = () => {
        this.setState({
            modalIsUpdate: false,
            id: ''
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
            
            
            <div className='text-center'>
            <button
                className='btn btn-primary my-4'
                onClick={this.openModal}
            >
                Create New Transaction
            </button>
            <CreateTransaction 
                modalIsOpen={this.state.modalIsOpen}
                closeModal={this.closeModal}
            />
            </div>
            

            <h2 className='mb-3'>Transactions: </h2>
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

                            {
                                this.state.id === transaction._id ?
                                    <UpdateTransaction 
                                        modalIsUpdate={this.state.modalIsUpdate}
                                        updateCloseModal={this.updateCloseModal}
                                        transaction={transaction}
                                    /> : 
                                    null
                            }
                            <button 
                                className='btn btn-danger'
                                onClick={() => this.props.removeTransaction(transaction._id)}
                            >
                                Remove
                            </button>
                            <button 
                                className='btn btn-success mx-2'
                                onClick={() => this.updateOpenModal(transaction._id)}
                            >
                                Update
                            </button>
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

export default connect(mapStateToProps, {loadTransactions, removeTransaction})(Dashboard);
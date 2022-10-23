import React, { Component } from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import { addNewTransaction } from '../../store/actions/transactionAction'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '500px'
    },
};

class CreateTransaction extends Component {

    state = {
        amount: 0,
        type: '',
        note: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addNewTransaction(this.state)
        console.log('Add New Transactios')

        this.setState({
            amount: 0,
            type: '',
            note: ''
        })
    }

    render() {
        const {amount, note} = this.state;
        console.log(amount);
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStyles}
            >
                <h2 className='mb-3'>Create A New Transaction</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='amount'>Amount: </label>
                        <input
                            type='number'
                            className='form-control mt-2 mb-3'
                            placeholder='Enter Amount'
                            name='amount'
                            id='amount'
                            value={amount}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='type'>Type: </label>
                        <select
                            className='form-control mt-2 mb-3'
                            name='type'
                            onChange={this.handleChange}
                        >
                            <option>Select A Type</option>
                            <option value='income'>Income</option>
                            <option value='expense'>Expense</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='note'>Note: </label>
                        <textarea
                            className='form-control mt-2 mb-3'
                            placeholder='Enter a Note'
                            name='note'
                            id='note'
                            value={note}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </Modal>
        )
    }
}

export default connect(null, {addNewTransaction})(CreateTransaction)
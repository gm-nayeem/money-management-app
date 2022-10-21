import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: {}
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const {email, password} = this.state

    return (
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h1 className='text-center display-4'>Login Here</h1>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email: </label>
              <input 
                type='email'
                className='mt-2 mb-3 form-control'
                placeholder='Enter Your Email'
                name='email'
                id='email'
                value={email}
                required
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password: </label>
              <input 
                type='password'
                className='mt-2 mb-3 form-control'
                placeholder='Enter Your Password'
                name='password'
                id='password'
                value={password}
                required
                onChange={this.handleChange}
              />
            </div>
            <Link to='/register'>Don't Have An Account? Register Here</Link>
            <button type='submit' className='btn btn-primary my-3 d-block'>Login</button>
          </form>
        </div>

      </div>
    )
  }
}

export default Login
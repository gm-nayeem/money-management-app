import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../store/actions/authAction'

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)){
      return {
        error: nextProps.auth.error
      }
    }
    return null;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.login({
      email: this.state.email,
      password: this.state.password
    }, this.props.history)
  }

  render() {
    const {email, password, error} = this.state

    return (
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h1 className='text-center mt-2 mb-4 display-4'>Login Here</h1>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email: </label>
              <input 
                type='email'
                className={
                  error.email ? 'mt-2 mb-3 form-control is-invalid' : 'mt-2 mb-3 form-control'
                }
                placeholder='Enter Your Email'
                name='email'
                id='email'
                value={email}
                onChange={this.handleChange}
              />
              {error.email && 
                <div className='invalid-feedback'>
                  {error.email}
                </div>
              }
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password: </label>
              <input 
                type='password'
                className={
                  error.password ? 'mt-2 mb-3 form-control is-invalid' : 'mt-2 mb-3 form-control'
                }
                placeholder='Enter Your Password'
                name='password'
                id='password'
                value={password}
                onChange={this.handleChange}
              />
              {error.password && 
                <div className='invalid-feedback'>
                  {error.password}
                </div>
              }
            </div>
            <Link to='/register'>Don't Have An Account? Register Here</Link>
            <button type='submit' className='btn btn-primary my-3 d-block'>Login</button>
          </form>
        </div>

      </div>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, {login})(Login)
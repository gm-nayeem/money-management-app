import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../store/actions/authAction'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    let { name, email, password, confirmPassword } = this.state
    this.props.register({name, email, password, confirmPassword})
  }

  render() {
    let { name, email, password, confirmPassword, error } = this.state
    console.log(this.props);

    return (
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h1 className='text-center mb-4 display-4'>Register Here</h1>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Name: </label>
              <input
                type='text'
                className={error.name ? 'mt-2 mb-3 form-control is-invalid' : 'mt-2 mb-3 form-control'}
                placeholder='Enter Your Name'
                name='name'
                id='name'
                value={name}
                onChange={this.handleChange}
              />
              {error.name && 
                <div className='invalid-feedback'>
                  {error.name}
                </div>
              }
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email: </label>
              <input
                type='email'
                className={error.email ? 'mt-2 mb-3 form-control is-invalid' : 'mt-2 mb-3 form-control'}
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
                className={error.password ? 'mt-2 mb-3 form-control is-invalid' : 'mt-2 mb-3 form-control'}
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
            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password: </label>
              <input
                type='password'
                className={error.confirmPassword ? 'mt-2 mb-3 form-control is-invalid' : 'mt-2 mb-3 form-control'}
                placeholder='Enter Your Confirm Password'
                name='confirmPassword'
                id='confirmPassword'
                value={confirmPassword}
                onChange={this.handleChange}
              />
              {error.confirmPassword && 
                <div className='invalid-feedback'>
                  {error.confirmPassword}
                </div>
              }
            </div>
            <Link to='/login'>Already Have An Account? Login Here</Link>
            <button type='submit' className='btn btn-primary my-3 d-block'>Register</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(
  mapStateToProps, 
  {register}
)(Register)
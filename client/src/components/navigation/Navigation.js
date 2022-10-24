import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

const textDecoration = {
    textDecoration: 'none'
}

class Navigation extends Component {
  render() {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <Link to='/' style={textDecoration}>
                <span className='mx-4 navbar-brand'>Money App</span>
            </Link>
            <button
                className='navbar-toggler'
                type='button'
                dataToggle='collapse'
                dataTarget='#navbarSupportedContent'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse  navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <NavLink to='/' style={textDecoration} activeClassName='active' exact>
                            <span className='nav-link'>
                                Home
                            </span>
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/dashboard' style={textDecoration} activeClassName='active'>
                            <span className='nav-link'>
                                Dashboard
                            </span>
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/login' style={textDecoration} activeClassName='active'>
                            <span className='nav-link'>
                                Login
                            </span>
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/register' style={textDecoration} activeClassName='active'>
                            <span className='nav-link'>
                                Register
                            </span>
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/' style={textDecoration} activeClassName='active'>
                            <span className='nav-link'>
                                Logout
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default Navigation
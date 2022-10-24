import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../store/actions/authAction'

const navStyle = {
    textDecoration: 'none'
}

class Navigation extends Component {
  render() {
    return (
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
            <Link to='/' style={navStyle}>
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
                        <NavLink to='/' style={navStyle} activeClassName='active' exact>
                            <span className='nav-link'>
                                Home
                            </span>
                        </NavLink>
                    </li>

                    {
                        this.props.auth.isAuthenticated ? 
                            <React.Fragment>
                                <li className='nav-item'>
                                    <NavLink to='/dashboard' style={navStyle} activeClassName='active'>
                                        <span className='nav-link'>
                                            Dashboard
                                        </span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <button 
                                        className='btn btn-dark'
                                        style={{color: 'gray'}}
                                        onClick={() => this.props.logout(this.props.history)}
                                    >
                                        Logout
                                    </button>

                                    {/* <NavLink to='/' style={navStyle} activeClassName='active'>
                                        <span className='nav-link'>
                                            Logout
                                        </span>
                                    </NavLink> */}
                                </li>
                            </React.Fragment> 
                            : 
                            <React.Fragment>
                                <li className='nav-item'>     
                                    <NavLink to='/login' style={navStyle} activeClassName='active'>
                                        <span className='nav-link'>
                                            Login
                                        </span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/register' style={navStyle} activeClassName='active'>
                                        <span className='nav-link'>
                                            Register
                                        </span>
                                    </NavLink>
                                </li>
                            </React.Fragment>
                    }      
                </ul>
            </div>
        </nav>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {logout})(Navigation)
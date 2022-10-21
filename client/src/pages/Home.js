import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>I am Home Page</h1>
        {
          this.props.auth.isAuthenticated ?
            <Link to='/login'><button className='btn btn-danger'>Logout</button></Link> :
            <Link to='/login'> <button className='btn btn-success'>Login</button></Link>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(Home);


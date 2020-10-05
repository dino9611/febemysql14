import React, { Component } from 'react';


class Login extends Component {
    state = {  }
    render() { 
        return (
            <div style={{height:'90vh'}} className='d-flex justify-content-center align-items-center'>
            <form>
                <input type='text' placeholder='Username' className='form-control mb-3' />
                <input type='password' placeholder='password' className='form-control mb-3' />
                <button className='btn btn-primary ' type='submit'>
                    Login
                </button>
            </form>
        </div>
          );
    }
}
 
export default Login;
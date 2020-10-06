import React, { Component,createRef } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {LoginAction} from './../redux/actions'
class Login extends Component {
    state = {
        username:createRef(),
        password:createRef(),
    }

    onLoginsubmit=(e)=>{
        e.preventDefault()
        const {username,password}=this.state
        var data={
            username:username.current.value,
            password:password.current.value
        }
        this.props.LoginAction(data)
    }
    render() {
        if(this.props.Auth.isLogin){
            return <Redirect to='/'/>
        }
        return (
            <div style={{height:'90vh'}} className='d-flex justify-content-center align-items-center'>
            <form onSubmit={this.onLoginsubmit}>
                <input type='text' ref={this.state.username} placeholder='Username' className='form-control mb-3' />
                <input type='password' placeholder='password' ref={this.state.password} className='form-control mb-3' />
                <button className='btn btn-primary ' type='submit'>
                    Login
                </button>
            </form>
        </div>
        );
    }
}
 
const maptatetoprops=(state)=>{
    return{
        Auth:state.Auth
    }
}
export default connect(maptatetoprops,{LoginAction}) (Login);
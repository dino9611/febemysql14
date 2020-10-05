import React, { Component,createRef } from 'react';
import {connect} from 'react-redux'
import {RegisterAction} from './../redux/actions'
import {Redirect} from 'react-router-dom'
class Register extends Component {
    state = {
        username:createRef(),
        email:createRef(),
        password:createRef(),
        conpass:createRef()
    }
    componentDidMount(){
        if(!this.props.Auth.isLogin){
            this.state.username.current.focus()
        }
    }

    onRegisterSubmit=(e)=>{
        e.preventDefault()
        const {username,email,password,conpass}=this.state
        if(password.current.value === conpass.current.value){
            var data={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
            }
            this.props.RegisterAction(data)
        }else{
            alert('harus sama conpass sama passmya')
        }
    }
    render() {
        if(this.props.Auth.isLogin){
            return <Redirect to='/'/>
        }
        return (
            <div style={{height:'90vh'}} className='d-flex justify-content-center align-items-center'>
                <form onSubmit={this.onRegisterSubmit}>
                    <input type='text' ref={this.state.username} placeholder='Username' className='form-control mb-3' />
                    <input type='email' ref={this.state.email} placeholder='Email' className='form-control mb-3' />
                    <input type='password' ref={this.state.password} placeholder='password' className='form-control mb-3' />
                    <input type='password' ref={this.state.conpass} placeholder='ulangi password' className='form-control mb-3' />
                    <button disabled={this.props.Auth.isLoading} className='btn btn-primary ' type='submit'>
                        Register
                    </button>
                </form>
            </div>
          );
    }
}

const MapStatetoProps=(state)=>{
    return {
        Auth:state.Auth
    }
}

export default connect(MapStatetoProps,{RegisterAction}) (Register);
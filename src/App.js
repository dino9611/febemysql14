import React,{useEffect,useState} from 'react';

import './App.css';
// import Axios from 'axios'
import {Switch,Route} from 'react-router-dom' 
import Header from './pages/header'
import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'
import Verified from './pages/verified'
import Product from './pages/product'
import SendVerified from './pages/sendVerif'
import {connect} from 'react-redux'
import {KeepLogin} from './redux/actions'
import Socket from './pages/socket';
function App(props) {

  useEffect(()=>{
    props.KeepLogin()
  },[]) // ini didmount

  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/register' exact component={Register} />
        <Route path='/login' exact component={Login} />
        <Route path='/verified' exact component={Verified} />
        <Route path='/product' exact component={Product} />
        <Route path='/sendverified' exact component={SendVerified} />
        <Route path='/socket' exact component={Socket} />
      </Switch>
    </div>
  );
}

export default connect(null,{KeepLogin}) (App);

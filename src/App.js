import React,{useEffect,useState} from 'react';

import './App.css';
import Axios from 'axios'
import {Switch,Route} from 'react-router-dom' 
import Header from './pages/header'
import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'

function App(props) {


  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/register' exact component={Register} />
        <Route path='/login' exact component={Login} />
      </Switch>
    </div>
  );
}

export default App;

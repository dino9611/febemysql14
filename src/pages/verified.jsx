import React, { Component } from 'react';
import Axios from 'axios'

import querystring from 'query-string'
import {connect} from 'react-redux'
import {verifiedaction} from './../redux/actions'

class Verified extends Component {
    state = {
        success:0
    }

    componentDidMount(){
        console.log(this.props.location.search)
        var obj=querystring.parse(this.props.location.search)
        console.log(obj)
        Axios.get(`http://localhost:5000/auth/verified`,{  // this same with `http://localhost:5000/auth/verified?id=${obj.id}`
            headers:{
                'Authorization':`Bearer ${obj.token}`
            }
        })
        .then((res)=>{
            localStorage.setItem('datauser',JSON.stringify(res.data))
            this.props.verifiedaction(res.data)
            this.setState({success:1})
        }).catch((err)=>{
            console.log(err)
            this.setState({success:2})

        })
        // Axios.get
    }

    render() {
        console.log(this.props.Auth)
        if(this.state.success===1){
            return(
            <div>
                <center>
                    <h1>
                       Berhasil verified
                    </h1>
                </center>
            </div>
            )
        }else if(this.state.success===2){
            return(
            <div>
                <center>
                    <h1>
                       gagal verified
                    </h1>
                </center>
            </div>
            )
        }
        return (
            <div>
                <center>
                    <h1>
                        sedang menunggu verified
                    </h1>
                </center>
            </div>
          );
    }
}


const bebas=(state)=>{
    return{
        Auth:state.Auth
    }
}

export default connect(bebas,{verifiedaction}) (Verified);
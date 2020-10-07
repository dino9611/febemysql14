import Axios from 'axios'
import {API_URL} from './../../helpers/ApiUrl'

export const RegisterAction=(data)=>{
    return (dispatch)=>{
        dispatch({type:"LOADING"})
        Axios.post(`${API_URL}/auth/register`,data)
        .then((res)=>{
            localStorage.setItem('datauser',JSON.stringify(res.data))
            dispatch({type:"LOGIN",payload:res.data})
        }).catch((err,res)=>{
            // dispatch({type:"ERROR",payload:err})
            console.log(err)
            alert(err)
        })
    }
}

export const LoginAction=(data)=>{
    return (dispatch)=>{
        dispatch({type:"LOADING"})
        Axios.post(`${API_URL}/auth/login`,data)
        .then((res)=>{
            localStorage.setItem('datauser',JSON.stringify(res.data))
            dispatch({type:"LOGIN",payload:res.data})
        }).catch((err,res)=>{
            // dispatch({type:"ERROR",payload:err})
            console.log(err)
            alert(err)
        })
    }
}

export const KeepLogin=()=>{
    return (dispatch)=>{
        let datauser=localStorage.getItem('datauser')
        if(datauser){
            datauser=JSON.parse(datauser)
            //cek tokennya dulu di api kalo kadaluarsa baru get di sql dan buat token baru --best practice
            Axios.get(`${API_URL}/auth/keeplogin/${datauser.id}`)
            .then((res)=>{
                localStorage.setItem('datauser',JSON.stringify(res.data))
                dispatch({type:"LOGIN",payload:res.data})
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}

export const verifiedaction=(data)=>{
    return {
        type:'LOGIN',
        payload:data
    }
}



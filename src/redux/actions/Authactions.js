import Axios from 'axios'

export const RegisterAction=(data)=>{
    return (dispatch)=>{
        dispatch({type:"LOADING"})
        Axios.post('http://localhost:5000/auth/register',data)
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
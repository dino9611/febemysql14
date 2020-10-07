import React, { Component } from 'react';
import {API_URL} from './../helpers/ApiUrl'
import Axios from 'axios'
class Product extends Component {
    state = {
        files:null
    }

    oninputfilechange=(e)=>{
        console.log(e.target.files)
        if(e.target.files[0]){
            console.log(e.target.files[0])
            this.setState({files:e.target.files[0]})
        }else{
            console.log('hapus')
            this.setState({files:null})

        }
    }

    onUploadClick=()=>{
        if(this.state.files){
            var formData=new FormData()
            var options={
                headers:{
                    'Content-type':'multipart/form-data'
                }
            }
            var data={
                caption:"abcde"
            }
            formData.append('image',this.state.files)
            formData.append('data',JSON.stringify(data))
            Axios.post(`${API_URL}/prod/addProd`,formData,options)
            .then((res)=>{
                alert('berhasil')
                console.log(res.data)
            })
        }else{
            alert('pilih foto dulu')
        }
    }

    render() { 
        return (
            <div>
                <input  type="file"  onChange={this.oninputfilechange}/>
                <button onClick={this.onUploadClick}>Upload</button>
            </div>
          );
    }
}
 
export default Product;
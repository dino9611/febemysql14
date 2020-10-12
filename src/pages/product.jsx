import React, { Component, createRef  } from 'react';
import {API_URL} from './../helpers/ApiUrl'
import Axios from 'axios'
import {Table,Modal, ModalHeader, ModalBody, ModalFooter,Button} from 'reactstrap'

class Product extends Component {
    state = {
        files:null,
        editfiles:null,
        dataprod:[],
        caption:createRef(),
        modal:false,
        dataedit:{}
    }

    componentDidMount(){
        Axios.get(`${API_URL}/prod/allprod`)
        .then((res)=>{
            this.setState({dataprod:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    ondataEditChange=(props,e)=>{
        this.setState({dataedit:{...this.state.dataedit,[props]:e.target.value}})
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

    oninputfileeditChange=(e)=>{
        console.log(e.target.files)
        if(e.target.files[0]){
            console.log(e.target.files[0])
            this.setState({editfiles:e.target.files[0]})
        }else{
            console.log('hapus')
            this.setState({editfiles:null})

        }
    }

    deleteProduct=(id)=>{
        let confirm=window.confirm('yakin mau hapus product id '+id)
        if(confirm){
            Axios.delete(`${API_URL}/prod/delprod/${id}`)
            .then(res=>{
                alert('berhasil dihapus')
                this.setState({dataprod:res.data,files:null})
            }).catch((err)=>{
                console.log(err)
            })
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
                caption:this.state.caption.current.value
            }
            formData.append('image',this.state.files)
            formData.append('data',JSON.stringify(data))
            Axios.post(`${API_URL}/prod/addProd`,formData,options)
            .then((res)=>{
                alert('berhasil')
                this.setState({dataprod:res.data,files:null})
            })
        }else{
            alert('pilih foto dulu')
        }
    }
    onUploadeditClick=()=>{
        var formData=new FormData()
        var options={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }
        var data={
            caption:this.state.dataedit.caption
        }
        formData.append('image',this.state.editfiles)
        formData.append('data',JSON.stringify(data))
        Axios.put(`${API_URL}/prod/editprod/${this.state.dataedit.id}`,formData,options)
        .then((res)=>{
            alert('berhasil')
            this.setState({dataprod:res.data,editfiles:null,modal:false})
        }).catch(err=>{
            alert('gagal')
            console.log(err)
        })
    }

    toggle=()=>{
        this.setState({modal:!this.state.modal,editfiles:null})
    }

    openModalEdit=(id)=>{
        let findindex=this.state.dataprod.findIndex((val)=>val.id==id)
        this.setState({dataedit:this.state.dataprod[findindex],modal:true})
    }
    renderTable=()=>{
        return this.state.dataprod.map((val,index)=>{
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.caption}</td>
                    <td><img src={API_URL+val.image} height='200' width='200' alt={val.id}/></td>
                    <td>
                        <button onClick={()=>this.deleteProduct(val.id)} className='mr-2 btn btn-danger'>
                            Delete
                        </button>
                        <button onClick={()=>this.openModalEdit(val.id)} className='btn btn-primary'>
                            Edit
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() { 
        return (
            <div>
                <div className='mt-5 mx-5' style={{width:300}}>
                    <input  type="file" className='form-control'  onChange={this.oninputfilechange}/>
                    <input  type="text" className='form-control mt-3' placeholder='Caption'  ref={this.state.caption}/>
                    <button className='btn btn-primary mt-3' onClick={this.onUploadClick}>Upload</button>
                </div>
                <div className='mx-5 px-5'>
                    <Table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>caption</th>
                                <th>Foto</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTable()}
                        </tbody>
                    </Table>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Edit Modal</ModalHeader>
                    {
                        Object.keys(this.state.dataedit).length === 0?
                        // untuk mengecek object kosong atau enggak
                        null
                        :
                        <ModalBody>
                            <input type="text" className='form-control' value={this.state.dataedit.caption} onChange={(e)=>this.ondataEditChange('caption',e)} />
                            <input  type="file" className='form-control' onChange={this.oninputfileeditChange}/>
                            {
                                this.state.editfiles?
                                <img src={URL.createObjectURL(this.state.editfiles)} width='200' height='200' alt=""/>
                                :
                                null
                            }
                        </ModalBody>
                    }
                    <ModalFooter>
                        <Button color="primary" onClick={this.onUploadeditClick}>Save</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
          );
    }
}
 
export default Product;
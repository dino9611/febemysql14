import React,{useEffect,useState} from 'react';

import './App.css';
import Axios from 'axios'
import { Table } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function App(props) {

  const [datakaryawan,setdatakaryawan]=useState([])
  const [page,setpages]=useState(1)
  const [addform,setAddform]=useState({
    nama:'',
    usia:'',
    berat:'',
    kota:'',
    th:''
  })
  useEffect(()=>{
    fetchdata()
  },[])

  // useEffect(()=>{
  //   fetchdata()
  // },[page])

  const fetchdata = async ()=>{
    try{
      console.log(page)
      var res=await Axios.get(`http://localhost:5000/toko/karyawans`)
      console.log(res.data)
      setdatakaryawan(res.data)
    }catch(err){
      console.log(err)
    }
  }
  
  const onChangeadd=(e,property)=>{
    setAddform({...addform,[property]:e.target.value})
  }

  const onpostdataclick= ()=>{
    console.log(addform)// property di addform sudah sesuai dengan column di mysql
    Axios.post(`http://localhost:5000/toko/karyawan`,addform)
    .then((res)=>{
      setdatakaryawan(res.data)
      setAddform({
        nama:'',
        usia:'',
        berat:'',
        kota:'',
        th:''
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

  const onDELETEclick=(id)=>{
    var confirm=window.confirm('yakin hapus data id ke '+ id)
    if(confirm){
      Axios.delete(`http://localhost:5000/toko/karyawan/${id}`)
      .then((res)=>{
        setdatakaryawan(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  const renderTable=()=>{
    return datakaryawan.map((val,index)=>{
      return (
      <tr key={index}>
        <th scope="row">{index+1}</th>
        <td>{val.nama}</td>
        <td>{val.usia}</td>
        <td>{val.berat}</td>
        <td>{val.kota}</td>
        <td>{val.th}</td>
        <td>
          <button>Edit</button>  
          <button onClick={()=>onDELETEclick(val.no)}>Delete</button>  
        </td>
      </tr>
      )
    })
  }

  // const pindahpage= async (halaman)=>{
  //   try{
  //     console.log(page)
  //     var res=await Axios.get(`http://localhost:5000/toko/karyawans?page=${halaman}`)
  //     console.log(res.data)
  //     setdatakaryawan(res.data)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  const renderpaging=()=>{
    var jumlahpage=Math.ceil(11/5)
    var arr=[]
    for(var i=0;i<jumlahpage;i++){
      console.log(i)
      if((i+1)==page){
        arr.push(
        <PaginationItem disabled>
          <PaginationLink >
            {i+1}
          </PaginationLink>
        </PaginationItem>
        )
      }else{
        arr.push(
          <PaginationItem>
            <PaginationLink onClick={()=>setpages(i+1)}>
              {i+1}
            </PaginationLink>
          </PaginationItem>
        )
      }
    }
    return arr
  }

  return (
    <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center'>
      <div >
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Usia</th>
              <th>berat</th>
              <th>kota</th>
              <th>th</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {renderTable()}
          </tbody>
          <tfoot>
            <th>#</th>
            <td>
              <input value={addform.nama} placeholder='input name' onChange={(e)=>onChangeadd(e,'nama')}/>
            </td>
            <td>
              <input placeholder='input usia' value={addform.usia} onChange={(e)=>onChangeadd(e,'usia')} type='number'/>
            </td>
            <td>
              <input placeholder='input berat' value={addform.berat} onChange={(e)=>onChangeadd(e,'berat')} type='number'/>
            </td>
            <td>
              <input placeholder='Kota' value={addform.kota} onChange={(e)=>onChangeadd(e,'kota')} type='text'/>
            </td>
            <td>
              <input placeholder='th' value={addform.th} onChange={(e)=>onChangeadd(e,'th')} type='number'/>
            </td>
            <td>
              <button onClick={onpostdataclick}>
                Add
              </button>
            </td>
          </tfoot>
        </Table>
        {/* <Pagination aria-label="Page navigation example">
            {renderpaging()}
          </Pagination> */}
      </div>
    </div>
  );
}

export default App;

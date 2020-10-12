import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

class Socket extends Component {
    state = { 
        usercount:0,
        messages:[],
        name:''
    }
    
    componentDidMount(){
        const socket = io('http://localhost:5000/',{transports: [ 'websocket' ]});

        socket.on('chat message', this.updateMessages);
        socket.emit('usercon')
        socket.on('user connected', (count)=>this.setState({usercount:count}));
        axios.get('http://localhost:5000/socket/getdata')
        .then((res) => {
          this.setState({messages:res.data})
        })
    }
    
    updateMessages = (msgs) => {
        this.setState({messages:msgs})
    }
    onBtnSendClick = () => {
        axios.post('http://localhost:5000/socket/senddata', {
          nama: this.state.name,
          message: this.refs.message.value
        }).then((res) => {
          console.log(res.data)
        })
    }
    
    onBtnClearClick = () => {
        axios.delete('http://localhost:5000/socket/clearmessages')
        .then((res) => {
            console.log(res.data)
        })
    }
    pencet=()=>{
        const socket = io('http://localhost:5000/',{transports: [ 'websocket' ]});
        socket.emit('tes','blabladdd')
    }
        
    renderListMessage = () => {
        return this.state.messages.map((item, index) => {
            return (
                <tr key={index}>
                <td onClick={()=>this.pribadi(item.nama)}>{item.nama}</td>
                <td>{item.message}</td>
                <td></td>
                </tr>
            )
        })
    }
    render() { 
        return (
            <div>
                <center>
                   <h1>
                        user connected: {this.state.usercount}
                   </h1>
                   <table>
                        <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Message</th>
                            <th><input type="button" value="Clear" onClick={this.onBtnClearClick} /></th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderListMessage()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    {this.state.name}
                                </td>
                                <td>
                                <input type="text" ref='message' />
                                </td>
                                <td>
                                <input type="button" value="Send" onClick={this.onBtnSendClick} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='2'>
                                    <input type="text" ref='nama' />
                                </td>
                                <td>
                                    <button onClick={()=>this.setState({name:this.refs.nama.value})}>setnama</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </center>
            </div>
          );
    }
}
 
export default Socket;


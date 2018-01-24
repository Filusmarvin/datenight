import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {base , app } from '../rebase';
import '../css/Chat.css';
import $ from "jquery";
import chatUsers from './chatUsers.js'





class Chat extends Component {
  constructor() {
    super()
    this.state={
      user: {},
      them: {},
      name:"",
      message:"",
      messages:[]
    }
  }


  componentDidMount(){
    let user = this.state.user;
    let messages = this.state.messages;
    let uid = user.uid;
    let props = this.props;
    console.log(props)


    base.fetch(`user/${uid}`,{
      context: this,
      asArray: false,
      then(data){
        console.log(data)
      }

    })
  }
   

  render(){
    let useruid = this.props.match.params.uid
    let params = this.props.match.params.usersuid
    let user = this.state.user.uid
    return(
      <div className="chatContainer">
        < chatUsers />
        <div>
          <p> Hello </p> 
        </div>
       
      </div>
    )
  }
}

export default Chat

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {base , app } from '../rebase';
import '../css/Chat.css';
import $ from "jquery";





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
    let uid = user.uid

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
      <div>
       
      </div>
    )
  }
}

export default Chat

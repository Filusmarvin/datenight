import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {base , app } from '../rebase';
import Sound from 'react-sound';
import '../css/DM.css';
import $ from "jquery";


class DM extends Component {
  constructor () {
    super()
    this.state={
      user : {},
      users: [],
      messages: [],
      other:{},
      dm:true,
      dmsetting: false
    }
  }




  componentDidMount(){
    let userprop = this.props.user
    let user = this.state.user
    let uid = this.props.uid
    let params = this.props.params
    console.log(uid , params);
    base.syncState(`user/${uid}/Chat/${params}/message`, {
      context: this,
      state: 'messages',
      asArray: true
    });
    base.fetch(`user/${uid}`,{
      context:this,
      asArray:false,
      then(data){
        console.log(data)
        this.setState({ user:data})
      }
    })

    base.fetch(`user/${params}`,{
      context:this,
      asArray:false,
      then(data){
        this.setState({ other:data})
      }
    })
    $('.dm.header').on('click', function(){
      console.log("hello")
    })
    $(".dmsettings").on('click',function(){
      
    })

  }

  componentDidUpdate(prevState, props){
    const iPhone = new Audio();
    iPhone.src = ("../Sounds/iPhone.mp3");

    console.log(prevState , props)
    let messages = this.state.messages

    if(props.messages.length < messages.length){
      console.log(true)
      return(
        < Sound
        url="../Sounds/iPhone.mp3"
        playStatus={Sound.status.PLAYING}
        playFromPosition={300 /* in milliseconds */}
       onLoading={this.handleSongLoading}
       onPlaying={this.handleSongPlaying}
       onFinishedPlaying={this.handleSongFinishedPlaying}
        volume="100"
        {...props}/>
      )
    } else{
      console.log(false)
    }
  }

  sendMessage(e){
    e.preventDefault();
    let messages = this.state.messages
    let text = this.input.value;
    let author = this.state.user.firstName
    let params = this.props.params
    let user = this.state.user.uid

    let new_message = {
      author,
      text
    }

    messages = [...messages, new_message]

    if(text !== ""){
      this.setState({ messages : messages })

      base.update(`user/${params}/Chat/${user}`,{

        data:{message: messages}
      })
      this.input.value = "";
    }
  }


  dm(){
    let dm = this.state.dm

    if(dm === true){
      this.setState({ dm : false})
      this.props.dm.bind(this)
    } else{
      this.setState({ dm: true })
      this.props.dm.bind(this)
    }
  }


  render () {
    let dm = this.state.dm
    let messages = this.state.messages;
    let user = this.state.user;
    let other = this.state.other
    return(
      <div className={dm ? "DM-container dm-border" : "bar" }>
        <header className="dm-header" onClick={this.dm.bind(this)}> Messaging {other.firstName}</header>
        <div className={dm ? "Messages" : "hidden-message"}> {messages.map((message, index) => {
          return(
            <div className="each-message" key={index}>
              <p> {message.author}</p>
              <p> {message.text} </p>
            </div>
          )
        })}</div>
        <div className={ dm ? "form-box" : "hidden-message"}>
          <form onSubmit={this.sendMessage.bind(this)}>
            <textarea className="dm-textarea" type="text" ref={ (input) => {this.input = input }} placeholder="Type your message here"/>
            <br />
            <button > Send Message</button>
          </form>
          <button className="dmsettings"> Settings </button>
        </div>
      </div>
    )
  }
}

export default DM

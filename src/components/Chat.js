import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {base , app } from '../rebase';
import '../css/Chat.css'


const Message = ({author, text , id , channel_id, params , user ,useruid }) => {

  const fun = () => {
    console.log(user, useruid)
    if ( user === params){
      return "Message-right"
    } else {
      return "Message-left"
    }
  }

  return(

    <div className={user === useruid ? "Message-right" : "Message-left"}>
      <p> {fun()}</p>
      <div className= "Message-author"> {author}</div>
      <div className="Message-text"> {text}</div>
    </div>
  )

}

const List = ({messages, author, params, useruid, user }) => (
  <div className="MessagePane-List">
    {messages.map(({author, text}, index) => <Message author={author} user={user} text={text} params={params} useruid={useruid} key={index} /> )}
  </div>
)


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
    let userprop = this.props.user
    let user = this.state.user
    let useruid = this.props.match.params.uid
    let params = this.props.match.params.usersuid
    console.log(useruid , params);
    base.syncState(`user/${useruid}/Chat/${params}/message`, {
      context: this,
      state: 'messages',
      asArray: true
    });
    base.fetch(`user/${useruid}`,{
      context:this,
      asArray:false,
      then(data){
        console.log(data)
        this.setState({ user:data})
      }
    })
  }

  user(){
    console.log(this.state.user)
  }

  onSubmit(){
    let user = this.state.user
    const {name , message} = this.state;
    this.onSend(this.state.user.name , message)
    this.setState({name:user.firstName, message:''})
  }

  onSend(name , text){
    let user = this.state.user
    let author = user.firstName
    let userprop = this.props.user
    let useruid = this.props.match.params.uid
    let params = this.props.match.params.usersuid
    console.log(params, useruid)
    const new_message = {
      // id: this.state.messages[this.state.messages.length - 1].id +1,
      author,
      text,
      channel_id: 1
    };

    const messages = [...this.state.messages, new_message];
    if(this.state.message !== ""){
      this.setState({ messages:messages});

      base.update(`user/${params}/Chat/${useruid}`,{
        data:{ message : messages }
      })
    }
  }

  Name(e){
    this.setState({ name: this.state.user.firstName})
  }
  Message(e){
    this.setState({ message: e.target.value })
  }

  render(){
    let useruid = this.props.match.params.uid
    let params = this.props.match.params.usersuid
    let user = this.state.user.uid
    console.log(this.state.messages)
    return(
      <div>
        <div className="channelList">

        </div>
        <div >
          <div className="Message-box">
            <List params={params} useruid={useruid}  user={user} messages={this.state.messages} />
          </div>
          <div>
            <div className="message-pane">
              <p className="message-name">
                {this.state.user.firstName} {this.state.user.lastName}
              </p>
              <p>
                <textarea
                  className="Message"
                  type="text"
                  placeholder="Message"
                  value={this.state.message}
                  onChange={this.Message.bind(this)}
                  />
              </p>
              <button className="message-button" onClick={this.onSubmit.bind(this)}> Something </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat

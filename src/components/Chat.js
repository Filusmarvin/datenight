import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {base , app } from '../rebase';
import '../css/Chat.css'

const Message = ({author, text , id , channel_id }) => (
  <div className="Message">
    <div className="Message-author"> {author}</div>
    <div className="Message-text"> {text}</div>
  </div>
)

const List = ({messages}) => (
  <div className="MessagePane-List">
    {messages.map(({author, text}, index) => <Message author={author} text={text} key={index} /> )}
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
    console.log(userprop);
    base.syncState(`user/${user.uid}`, {
    context: this,
    state: 'user',
    asArray: false
  });
  }

  user(){
    console.log(this.state.user)
  }

  onSubmit(){
    const {name , message} = this.state;
    this.onSend(this.state.user.name , message)
    this.setState({name:'', message:''})
  }

  onSend(name , text){
    let user = this.state.user
    let author = user.firstName
    const new_message = {
      // id: this.state.messages[this.state.messages.length - 1].id +1,
      author,
      text,
      channel_id: 1
    };

    const messages = [...this.state.messages, new_message];
    this.setState({ messages:messages});
    // base.update(`user/${user}`,{
    //   data:{ message: messages}
    // })
  }

  Name(e){
    this.setState({ name: this.state.user.firstName})
  }
  Message(e){
    this.setState({message: e.target.value})
  }

  render(){
    return(
      <div>
        <div className="channelList">

        </div>
        <div>
          <div className="Message-box">
            <List messages={this.state.messages} />
          </div>
          <div>
            <div>
              <p>
                {this.state.user.firstName}
              </p>
              <p>
                <textarea
                  className="message"
                  type="text"
                  placeholder="Message"
                  value={this.state.message}
                  onChange={this.Message.bind(this)}
                  />
              </p>
              <button onClick={this.onSubmit.bind(this)}> Something </button>
            </div>
          </div>
          <button onClick={this.user.bind(this)}> Something Else</button>
        </div>
      </div>
    )
  }
}

export default Chat

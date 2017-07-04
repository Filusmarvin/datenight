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
const channels = [
  {id: 1, name: "general channel"},
  {id: 2, name: "birthday channel"},
  {id: 3, name: "water channel"},
  {id: 4, name: "ironyard channel"}
]

const selectedId = 2;

const Channel = ({name , isSelected }) => {
  const className = isSelected ? "ChannelList-item ChannelList-item-selected" : "ChannelList "
  return(
    <div className="channelList">{name}</div>
  )
};

const ChannelList = ({ name }) => (
  <div className="ChannelList-item">
    {
      channels.map(({name , id }) => {
         return( <Channel key={id} name={name} />)
      })
    }
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

  componentWillReceiveProps(props){

  }

  componentDidMount(){
    let userprop = this.props.user
    let user = this.state.user
    let useruid = this.props.match.params.uid
    let params = this.props.match.params.usersuid
    console.log(useruid , params);
    base.syncState(`user/${useruid}/Chat/+${params}`, {
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
    this.setState({ messages:messages});
    base.update(`user/${useruid}/Chat/+${params}`,{
      data:{ chat: messages }
    })
    base.update(`user/${params}/Chat/+${useruid}`,{
      data:{ chat: messages }
    })
  }

  Name(e){
    this.setState({ name: this.state.user.firstName})
  }
  Message(e){
    this.setState({ message: e.target.value })
  }

  render(){
    return(
      <div>
        <div className="channelList">

        </div>
        <div >
          <div className="Message-box">
            <List messages={this.state.messages} />
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

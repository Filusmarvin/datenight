import React, { Component } from 'react';
import  { Link } from 'react-router-dom'
import {base } from '../rebase';
import '../css/userprofile.css'



class UserProfile extends Component {
    constructor(){
      super()
      this.state = {
        user: {},
        users:[],
        chatUser:{}
      }
    }


    // componentWillReceiveProps(props){
    //   let user = this.state.user
    //   let users = this.state.users
    //   let index = this.props.match.params.index
    //   // this is to set the user
    //   base.fetch(`user/${user.uid}` ,{
    //     context: this,
    //     asArray: false,
    //     then(data){
    //       this.setState({ user: data}, console.log(user))
    //     }
    //   })
    //
    //   this.setState({chatUser: users[index] })
    // }

    componentDidMount(){
      let user = this.state.user
      let users = this.state.users
      let params = this.props.match.params.usersuid
      console.log(params)
      // set state to users
      base.fetch(`user/${params}`,{
        context:this,
        asArray: false,
        then(data){
          this.setState({ user: data})
        }
      })
    }


    user(){
      let index = this.props.match.params.index
      console.log(this.state.users, this.state.chatUser)
    }

  render(){
    let user = this.state.user
    let uid = this.props.match.params.uid
    let params = this.props.match.params.usersuid
    let index = this.props.match.params.index
    return(
      <div className="profile-container">
        <header className="profile-header">
          <img className="profile-image"src={user.photoURL} alt="pic"/>
          <div className="profile-bio">
            <p> {user.displayName} </p>
            <p> {user.age} years old</p>
            <button className="like-button profile-button"> Like </button>
            <Link to={`/user/${uid}/profile/${params}/message`} className="message-button profile-button" > Message </Link>
            <Link to={`/user/${uid}/profile/${params}/common`}  className="similarity-button profile-button"> View similarities</Link>
          </div>
        </header>
        <div className="everything-else">
          <div className="left-div">
            <h2> My Self Summary! </h2>
            <p className="summary"> {user.bio}</p>
            <h2> My Addictions </h2>
            <p> {user.addiction}</p>
            <h2> My Bucket List</h2>
            <p>{user.bucketList}</p>
            <h2> 5 words that describe me are </h2>
            <p>{user.describe}</p>
            <h2> My Flaws </h2>
            <p> {user.flaws} </p>
            <h2> Goals </h2>
            <p>{user.goals}</p>
            <h2> My Pet Peeves are </h2>
            <p> {user.peeves}</p>
            <h2>If I could have any super power it would be </h2>
            <p> {user.powers}</p>
          </div>
          <div className="right-div">

          </div>
        </div>
        <div>
          <button onClick={this.user.bind(this)}> Somtyfsfjvo iklmvs</button>
        </div>
      </div>
    )
  }
}

export default UserProfile

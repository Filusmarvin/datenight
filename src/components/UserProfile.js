import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import {base } from '../rebase';
import '../css/userprofile.css';
import DM from './DM.js';
import $ from "jquery";



class UserProfile extends Component {
    constructor(){
      super()
      this.state = {
        user: {},
        otherUser:{},
        users:[],
        chatUser:{},
        dm: true,
        settings: false,
        color: "#104da1"
      }
    }

    componentDidMount(){
      let user = this.state.user
      let users = this.state.users
      let params = this.props.match.params.profile
      console.log(params)
      // set state to users
      base.fetch(`user/${params}`,{
        context:this,
        asArray: false,
        then(data){
          this.setState({ otherUser: data})
        }
      })
    }

    componentWillReceiveProps(props){
     // console.log(props)
      this.setState({
        user: props.user,
        users: props.users
      })
      console.log(this.state.user, this.state.users)
    }


    user(){
      let index = this.props.match.params.index
      console.log(this.state.user, this.state.chatUser)
    }

    dm(){
      let dm = this.state.dm
      if(dm === true){
        this.setState({ dm : false })
      } else {
        this.setState({ dm : true })
      }
    }

    settings(){
      let settings = this.state.settings;
      if( settings === true){
        this.setState({ settings : false})
      } else {
        this.setState({ settings : true })
      }
    }

    showSettings(){
      alert('hello')
    }

  render(){
    let dm = this.state.dm;
    let user = this.state.user
    let otherUser = this.state.otherUser
    let uid = this.props.match.params.uid
    let params = this.props.match.params.profile
    let index = this.props.match.params.index
    let settings = this.state.settings;
    //console.log(user.photoURL)
    return(
      <div className="profile-container">
        <header className="profile-header">
          <div className="top-bio-sect">
            <div className="profile-bio">
              <p> {user.displayName} </p>
              <p> {user.age} years old</p>
              <p> Lives in {user.city}</p>
            </div>
            <img className="profile-image" src={user.photoURL} alt="pic"/>
            <div className="profile-bio">
             <p> Ethnicity: {user.ethnicity} </p>
              <p> Movie: {user.movie} </p>
              <p> Hobby: {user.hobby} </p>
            </div>
          </div>
          <div className="bottom-bio-sect">
              <button className="user-button like-button"> Like </button>
              <Link to={`/user/${uid}/profile/${params}/message`} className="user-button message-button"> Message </Link>
              <Link to={`/user/${uid}/profile/${params}/common`}  className="user-button similarity-button"> View similarities</Link>
              <button className="user-button"> Add to Favorites </button>
          </div>
        </header>
          <div className="few-things">
            <h2> A few things about me is.....</h2>
            <p> My name is {user.firstName}</p>
            <p> I am from {user.city}</p>
            <p> My favorite Movie is {user.movie}</p>
            <p> I love to eat at {user.restaraunt}</p>
          </div>
        <div className="everything-else">
          <div className="center-div">
          <h1> About {otherUser.firstName} {otherUser.lastName}</h1>
            {otherUser.bio ? <h2> My Self Summary! </h2> : null}
            {otherUser.bio ?  <p className="summary"> {user.bio}</p> : null }
            {otherUser.addiction ? <h2> My Addictions </h2> : null }
            {otherUser.addiction ? <p> {otherUser.addiction}</p> : null }
            {otherUser.bucketList ? <h2> My Bucket List</h2> : null }
            {otherUser.bucketList ? <p>{otherUser.bucketList}</p> : null }
            {otherUser.describe ?<h2> 5 words that describe me are </h2> : null }
            {otherUser.describe ?<p>{otherUser.describe}</p> : null }
            {otherUser.flaws ? <h2> My Flaws </h2>: null }
            {otherUser.flaws ? <p> {otherUser.flaws} </p>: null }
            <h2> Goals </h2>
            <p>{user.goals}</p>
            <h2> My Pet Peeves are </h2>
            <p> {user.peeves}</p>
            <h2>If I could have any super power it would be </h2>
            <p> {user.powers}</p>
          </div>
        </div> 
        <div>
          <button onClick={this.user.bind(this)}> Somtyfsfjvo iklmvs</button>
        </div>
        <div className= "DM-comp" >
          <DM className={dm ? null : 'bar'} params={params} dm={this.dm.bind(this)} user={user} uid={uid} 
          settings={this.settings.bind(this)}/>
        </div>
        <div className={settings ? "settingsbox" : "hidden"}>
          Hello World, I am right here on the bottom somewhere
        </div> 
      </div>
    )
  }
}

export default UserProfile

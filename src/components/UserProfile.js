import React, { Component } from 'react';
import  { Link } from 'react-router-dom'
import {base } from '../rebase';
import '../css/userprofile.css'
import DM from './DM.js'



class UserProfile extends Component {
    constructor(){
      super()
      this.state = {
        user: {},
        users:[],
        chatUser:{},
        dm: true
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
          this.setState({ user: data})
        }
      })
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

  render(){
    let dm = this.state.dm
    let user = this.state.user
    let uid = this.props.match.params.uid
    let params = this.props.match.params.profile
    let index = this.props.match.params.index
    console.log(params)
    return(
      <div className="profile-container">
        <header className="profile-header">
          <div className="top-bio-sect">
            <div className="profile-bio">
              <p> {user.displayName} </p>
              <p> {user.age} years old</p>
              <p> Lives in {user.city}</p>
            </div>
            <img className="profile-image"src={user.photoURL} alt="pic"/>
            <div className="profile-bio">
             <p> Ethnicity: {user.ethnicity} </p>
              <p> Movie: {user.movie} </p>
              <p> Hobby: {user.hobby} </p>
            </div>
          </div>
          <div className="bottom-bio-sect">
            <div className="action-buttons">
              <div className="button-box">
                <button className="user-button like-button"> Like </button>
                <Link to={`/user/${uid}/profile/${params}/message`} className="user-button message-button"> Message </Link>
                <Link to={`/user/${uid}/profile/${params}/common`}  className="user-button similarity-button"> View similarities</Link>
              </div>
              <div>
                <button className="user-button"> Favorites </button>
                <button className="user-button"> Wink </button>
                <button className="user-button"> Poke </button>
              </div>
            </div>
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
        </div>
        <div>
          <button onClick={this.user.bind(this)}> Somtyfsfjvo iklmvs</button>
        </div>
        <div className= "DM-comp" >
          <DM className={dm ? null : 'bar'} params={params} dm={this.dm.bind(this)} user={user} uid={uid} />
        </div>
      </div>
    )
  }
}

export default UserProfile

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Redirect} from 'react-router'
import '../css/hover.css';
import '../css/app.css'
import Login from './Login.js'
// import Footer from  './Footer.js'
import Signup from './SignUp.js'
import Home from './Home.js'
import {base , app } from '../rebase';
import firebase from 'firebase'
import UserAccount from './UserAccount.js'
import Search from './Search.js'
import axios from 'axios'
import UserProfile from './UserProfile.js'
import Common from './Common.js'
import Header from './Header.js'
import Change from './Change.js'
import Chat from './Chat.js'
let eventKey = "kzLJCk4t3WPN7Pk5"

var provider = new firebase.auth.FacebookAuthProvider();

class App extends Component {
  constructor() {
    super()
    this.state = {
      user:{},
      users:{ genre:false },
      uid:"",
      movies:[],
      location:{}
    }
  }

  componentDidMount () {
    // whenever user logs in or out, run setUserState
    app.auth().onAuthStateChanged(this.setUserState.bind(this))
    axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAhoxu3waM5qMIQHwXGZ4Gcq7VuDcRohtU")
    .then(obj => {
      this.setState({
        location:obj.data.location
      })
    })
}


  setUserState (user) {
    let uid = user.uid
    let userState = this.state.user
    // console.log(uid)
    this.setState({ user: { ...userState,
      displayName: user.displayName,
      photoURL:user.photoURL,
      phoneNumber: user.phoneNumber,
      email: user.email,
      uid: user.uid
    }})

    base.fetch(`user`, {
      context: this,
      asArray: false,
      then(data){
        this.setState({ users : data })
      }
    })

    if(user){
      let uid = user.uid
      // console.log(this.state.user)
      base.update(`user/${uid}`,{
        data:{
          displayName: user.displayName,
          photoURL:user.photoURL,
          phoneNumber: user.phoneNumber,
          email: user.email,
          uid: user.uid
        }
      })
    }

    base.fetch(`user/${uid}`,{
      context:this,
      asArray:false,
      then(data){
        // console.log(user,data)
        this.setState({
          user: {...user, ...data}
        })
      }
    })
  }

  updateState(){
  let uid = this.state.user.uid
  let user = this.state.user
    base.fetch(`user/${uid}`, {
      context:this,
      asArray: false,
      then(data){
        this.setState({user: {...user, ...data}})
      }
    })
  }

  add(){
    let user = this.state.user
    let uid = this.state.user.uid
    if(user.uid){
      base.update(`user/${uid}`,{
        data: {
          displayName: user.displayName ,
          photoURL:user.photoURL,
          phoneNumber: user.phoneNumber,
          email: user.email,
          uid: user.uid
        }
      })
    }
  }


  loginWithFacebook() {
    firebase.auth().signInWithRedirect(provider)
  }

  logInWithGoogle(){
    firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token.
    var token = result.credential.accessToken;
  }
  var user = result.user;

  console.log(user,token)

});

// Start a sign in process for an unauthenticated user.
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
firebase.auth().signInWithRedirect(provider);
  }

  createUserNameAndPassword(email,password){
    console.log(email , password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
  		if (user) {
  			console.log(user.uid)
  			// console.log(response)
      }
    })
  }

  logInWithUserNameAndPassword(email, password){
    console.log(email , password)
    firebase.auth().signInWithEmailAndPassword(email, password)
  }

  userName (info){
    let uid = this.state.user.uid
    base.update(`user/${uid}`,{
      data:{
        firstName:info.firstName,
        lastName:info.lastName,
        restaraunt:info.restaraunt,
        hobby:info.hobby,
        movie:info.movie,
        genre:info.genre
      }
    })
    this.forceUpdate()
  }

  logOut () {
    app.auth().signOut().then(() => {
  });
  this.setState({ user: {} })
  window.location.assign("/")
}

displayName () {
  if (this.state.user.uid){
    return  this.state.user.displayName
  } else {
    return null
  }
}
  changeBoo(){
    this.setState({ boo: false })
  }
  button(){
    return axios.get(`http://eventful.com/events?q=hiphop&l=San+Diego&t=This+Weekend&c=music&app_key=${eventKey}`)
    // .then(obj => console.log(obj))
  }

  // <Route exact path={`/signup`} render={(pickles) => ( !genre ?
  // ( <Signup user={this.state.user} movie={this.state.movie} updateState={this.updateState.bind(this)}
  // setUserState={this.setUserState} user={this.state.user} changeBoo={this.changeBoo.bind(this)}
  // {...pickles} /> ) : (<Redirect to={`/user/${uid}`} />))} />
  getEvents(location) {
      axios.get(`https://tiy-orl-proxy.herokuapp.com/eventful?app_key=V5W6PxsWgHLxCZTb&where=${location[1]},${location[2]}&within=25&date=Next%20Week&sort_order=popularity`)
      .then(response => this.setState({ localEvents: response.data.events.event }))
    }

  render() {
    let loggedin = app.auth().currentUser ? true : false
    let uid = this.state.user.uid

    return (
      <Router>
      <div>
      { uid ? <Header user={this.state.user} logOut={this.logOut.bind(this)} /> : false }

        <Route exact path="/" render={(pickles) =>( loggedin ? ( <Redirect to={`/signup/${uid}`} />) :
      (<Login createUserNameAndPassword={this.createUserNameAndPassword.bind(this)}
      logInWithUserNameAndPassword={this.logInWithUserNameAndPassword.bind(this)}
      loginWithFacebook={this.loginWithFacebook.bind(this)}
      logInWithGoogle={this.logInWithGoogle.bind(this)}/>))}/>


      <Route exact path={`/user/:uid/home`} render={(pickles) =>
        <Home logOut={this.logOut.bind(this)} users={this.state.users}
        user={this.state.user} {...pickles} />} />


        <Route exact path={`/user/:uid`} render={(pickles) =>
          <UserAccount user={this.state.user}  logOut={this.logOut.bind(this)}
          userName={this.userName.bind(this)}
          {...pickles} />}/>

        <Route exact path={`/user/:uid`} render={ (pickles) => <Change  {...pickles} /> } />

        <Route exact path="/signup/:uid" render={ (pickles) =>( this.state.user.genre ?

          (<Redirect to={`/user/${uid}`} /> )

          :

        (  <Signup  user={this.props.user} {...pickles}/>)  )} />

        <Route exact path="/user/:uid/search" render={(pickles) =>
          <Search user={this.state.user} logOut={this.logOut.bind(this)}
           {...pickles} />} />

        <Route exact path="/user/:uid/profile/:usersuid" render={(pickles) =>
        <UserProfile user={this.state.user} users={this.state.users}{...pickles}/> } />


        <Route exact path="/user/:uid/profile/:usersuid/common" render={(pickles) =>
        <Common user={this.state.user} users={this.state.users}{...pickles}/> } />

        <Route exact path="/user/:uid/profile/:usersuid/message" render={(pickles) =>
        <Chat user={this.state.user} users={this.state.users}{...pickles}/> } />

      </div>
      </Router>
    );
  }
}

export default App;

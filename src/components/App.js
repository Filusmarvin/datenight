import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Redirect} from 'react-router'
import '../css/hover.css';
import '../css/app.css'
import Login from './Login.js'
import Footer from  './Footer.js'
import Signup from './SignUp.js'
import {base , app } from '../rebase';
import firebase from 'firebase'
// import reactfire from 'reactfire'
import UserAccount from './UserAccount.js'
import graph from 'fb-react-sdk';
// import axios from 'axios'
import Search from './Search.js'


var provider = new firebase.auth.FacebookAuthProvider();
<Route path="/user/:uid/search" render={(pickles) =>
< Search {...pickles} user={this.state.user}/> } />

class App extends Component {

  constructor() {
    super()
    this.state = {
      user:{},
      uid:""
    }
  }

  componentDidMount () {
    // whenever user logs in or out, run setUserState
    app.auth().onAuthStateChanged(this.setUserState.bind(this));
    // window.fbAsyncInit = function() {
    //   FB.init({
    //      appId            : '1927893310763479',
    //      autoLogAppEvents : true,
    //      xfbml            : true,
    //     version          : 'v2.9'
    //   });
    //   FB.AppEvents.logPageView();
    // };

  //  (function(d, s, id){
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {return;}
  //     js = d.createElement(s); js.id = id;
  //     js.src = "//connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));
  }


  setUserState (user) {
    console.log('line 56 ', user)
    this.setState({ user:{
      displayName: user.displayName ,
      photoURL:user.photoURL,
      phoneNumber: user.phoneNumber,
      uid: user.uid
      } || {} });
  if(user){
    base.syncState(`user/${user.uid}`, {
    context: this,
    state: 'user',
    asArray: null
    });
  }
  }


  loginWithFacebook() {
    firebase.auth().signInWithPopup(provider)
    .then(  (result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // console.log(token)
      // The signed-in user info.
      var user = result.user;
      // console.log(user)
      this.setState({ user:{
        displayName: user.displayName ,
        photoURL:user.photoURL,
        phoneNumber: user.phoneNumber,
        uid: user.uid
        }
       })
    })
  }

  userName (info){
    this.setState({ user:{...this.state.user,
       firstName: info.firstName,
       lastName: info.lastName,
       restaraunt: info.restaraunt,
       hobby: info.hobby,
       movie: info.movie,
       genre: info.genre,
     }})
  }

  logOut () {
    app.auth().signOut().then(() => {
    //return value is null
    this.forceUpdate()
  });

}

displayName () {
  if (this.state.user.uid){
    return  this.state.user.displayName
  } else {
    return null
  }
}


  render() {
    let loggedin = app.auth().currentUser ? true : null
    let uid = this.state.user.uid
    return (
      <Router>
      <div>
        <Route exact path="/" render={(pickles) => (
        loggedin ? (<Redirect to={`/user/${uid}`} />) : (
          <Login loginWithFacebook={this.loginWithFacebook.bind(this)}/>
        )) }/>


        <Route exact path="/signup" render={(pickles) =>
          <Signup user={this.state.user} {...pickles} /> } />

        <Route exact path="/user/:uid" render={(pickles) => ( loggedin ?
          (<UserAccount user={this.state.user}  logOut={this.logOut.bind(this)}
          userName={this.userName.bind(this)}{...pickles} />) :
          (<Redirect to="/" />)
        )} />



      </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
 import {Link } from 'react-router-dom'
// import base from '../rebase';
// import firebase from 'firebase'
// import reactfire from 'reactfire'
import "../css/useraccount.css"
import axios from 'axios'
const movieKey = "81599007ff214265c13a0888da791d0c"
const dinnerKey = "31060f9bfe02586b"
const dinKey ="179f6b05297ee5efce0b417a891b2dc5"

class UserAccount extends Component{
  userInfo(e , info){
    e.preventDefault()
    info.firstName = this.firstName.value
    info.lastName = this.lastName.value
    info.restaraunt = this.restaraunt.value
    info.hobby = this.hobby.value
    info.movie = this.movie.value
    info.genre = this.genre.value
    console.log(info)
    this.props.userName(info)
  }

getMovieInfo(params){
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${params}`)
  .then(results => results).then(obj => console.log(obj.data.results)).then( obj => obj.data.results.map((data,index) => {
    return(
      <p> {data.id}</p>
    )
  }))
}

getDinner (params){
  axios.get(`https://api.eatstreet.com/publicapi/v1/restaurant/${dinnerKey}`).then(results => results)
  .then(obj => console.log(obj))
}

  aboutName() {
    if (this.props.user.firstName){
      return(
      <form>
        <li className="about-li"> First Name:{this.props.user.firstName} </li>
        <li className="about-li"> Last Name: {this.props.user.lastName} </li>
        <li className="about-li"> Restaraunt: {this.props.user.restaraunt} </li>
        <li className="about-li"> Hobby: {this.props.user.hobby} </li>
        <li className="about-li"> Movie:{this.props.user.movie} </li>
        <li className="about-li"> Movie Genre:{this.props.user.genre} </li>
      </form>)
    }
    else {
      return(
      <form>
        <li className="new-li"> <p className="new-p"> First Name*    </p> <input className="input-new " type="text"
        ref={(input) => { this.firstName = input;} }/> <button onClick={this.userInfo.bind(this)}>Enter</button> </li>
        <li className="new-li"> <p className="new-p"> Last Name </p> <input className="input-new " type="text"
        ref={(input) => { this.lastName = input;} }/>  </li>
        <li className="new-li"> <p className="new-p"> Restaraunt </p> <input className="input-new " type="text"
        ref={(input) => { this.restaraunt = input;} }/>  </li>
        <li className="new-li"> <p className="new-p"> Hobby </p> <input className="input-new " type="text"
        ref={(input) => { this.hobby = input;} }/>  </li>
        <li className="new-li"> <p className="new-p"> Favorite Movie*    </p> <input className="input-new " type="text"
        ref={(input) => { this.movie = input;} }/>  </li>
        <li className="new-li"> <p className="new-p"> Movie Genre </p> <input className="input-new " type="text"
        ref={(input) => { this.genre = input;} }/> </li>
      </form>)
    }
  }

  render () {
    const user = this.props.user
    const empty = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj1l7LggvrTAhUFRSYKHRBnDKMQjRwIBw&url=https%3A%2F%2Fpixabay.com%2Fen%2Fblank-profile-picture-mystery-man-973460%2F&psig=AFQjCNG-W1WQxehgRdPSYMv5mg5YJ2SmVw&ust=1495216794447962"
    return (
      <div className="userAccount">
        <header className="userHeader">
          <h1 className="helloUser"> Welcome back,  </h1>
          <h1 className="helloUser">{user.uid ? user.displayName : 'User'}</h1>
        </header>
        <div className='backHome'>
          <h2>Sign out here</h2>
          <button className="backHome-button" onClick={this.props.logOut.bind(this)}> Back to home </button>
        </div>
        <div className="userContainer">
          <div>
            <img src={user.photoURL ? user.photoURL : empty} className="userPhoto" alt="Profile"/>
            <p>Email: {user.email}</p> <p>{ user.phoneNumber ? "Phone Number:" + user.phoneNumber : null}</p>
            <p> View <a href={`//www.facebook.com`} target="_blank"><span className="accountURL hvr-bob">{user.displayName}</span></a> Facebook </p>
          </div>
          <div className="aboutBox">
            <h1>About {user.displayName}</h1>
              {this.aboutName()}
              <p> Hello World {this.getMovieInfo(this.props.user.movie)}</p>
              {this.getDinner()}
          </div>
          <Link to={`${user.uid}/search`}>Search</Link>
        </div>
      </div>
    )
  }
}

export default UserAccount

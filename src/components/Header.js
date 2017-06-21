import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
// import {base } from '../rebase';
// import axios from 'axios'
import '../css/common.css';
// const movieKey = "81599007ff214265c13a0888da791d0c"


class Header extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  render(){
    let uid = this.state.user.uid
    let user = this.state.user
    return(
      <header className="main-head">
      <div className="logo" >
        <Link to="/home" > <img className="logo-image" src={require("../images/heart.jpeg")} alt="DND" /></Link>
      </div>
      <nav className="header-nav">
        <Link to="/Home" className="hvr-grow header-name"> Browse users </Link>
        <Link to={`/user/${uid}`} className="hvr-grow header-name"> My Account</Link>
        <Link to={`/user/${uid}/search`}className="hvr-grow header-name"> Search places </Link>
         <span onClick={this.props.logOut}><Link to="/" className="hvr-grow header-name"> Log Out </Link> </span>
        <img className="menu" src={user.photoURL} alt="" />
      </nav>
      </header>
    )
  }
}

export default Header

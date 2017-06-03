import React, { Component } from 'react';
import  { Link } from 'react-router-dom'
import {base } from '../rebase';
import '../css/home.css'


class Home extends Component {
    constructor(){
      super()
      this.state = {
        users:[],
        user:[]
      }
    }
    componentDidMount(){
      // set state to users
      base.fetch(`user` ,{
        context: this,
        asArray: true,
        then(data){
          this.setState({ users: data})
          console.log(this.state.users)
        }
      })
      base.fetch(`user/${this.state.user.uid}` ,{
        context: this,
        asArray: false,
        then(data){
          this.setState({ user: [data]})
          console.log(this.state.user)
        }
      })
    }

  showUser(){
    let users = this.state.users
    let uid = this.state.users
    return users.map((users,index) => {
      return(
        <div className="user-pic" key={index}>
          <div className="pic">
            <Link to={`/user/${uid[index].uid}/profile/${index}`}>
              <img className="profile-pic"src={users.photoURL} alt="Profile" />
            </Link>
          </div >
          <div className="mini-bio">
            <div className="age-name">
              <p> {users.displayName}  </p>
              <p> {users.age} years old </p>
            </div>
            <div className="movie-restaurant">
              <p> {users.movie} </p>
              <div className="verticle"></div>
              <p> {users.restaraunt} </p>
            </div>
          </div>
        </div>
      )
    })
  }
  button(e){
    e.preventDefault()
    let text = this.text.value
    let age = this.age.value
    let lastName = this.lastName.value
    let ethnicity = this.ethnicity.value
    console.log(text)
  }

  searchUser(){
    let user = this.input.value
    // this.state.users.filter( )
  }


  render() {
    return (
      <div>
        <div className="search-users">
          <p> Search for other users </p>
          <input className="user-input" ref={(input) => {this.input = input } } type="text" />
          <button onClick={this.searchUser.bind(this)}> Search </button>
        </div>
        <div className="all-users">
          { this.showUser()}
        </div>
      </div>

    );
  }
}

export default Home

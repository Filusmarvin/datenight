import React, { Component } from 'react';
import  { Link } from 'react-router-dom'
import {base } from '../rebase';
import '../css/home.css'


class Home extends Component {
    constructor(){
      super()
      this.state = {
        users:[],
        user:{}
      }
    }

    componentWillReceiveProps(props){
      let user = this.props.user
      console.log(user.uid)
      // this is to set the user
      base.fetch(`user/${user.uid}` ,{
        context: this,
        asArray: false,
        then(data){
          this.setState({ user: [data]})
        }
      })
    }

    componentDidMount(){
      console.log(this.props.user)
      // set state to users
      base.fetch(`user` ,{
        context: this,
        asArray: true,
        then(data){
          this.setState({ users: data})
        }
      });
    }

  showUser(){
    let users = this.state.users
    let user = this.state.user
    let uid = this.state.user
    console.log(uid, user);
    return users.map((users,index) => {
      return(
        <div className="user-pic" key={index}>
          <div className="pic">
            <Link to={`/user/${user.uid}/profile/${uid[index].uid}`}>
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
  //   e.preventDefault()
  //   let text = this.text.value
  //   let age = this.age.value
  //   let lastName = this.lastName.value
  //   let ethnicity = this.ethnicity.value
 }

  searchUser(){
    // let user = this.input.value
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

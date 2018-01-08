import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import {base } from '../rebase';
import '../css/home.css';
import $ from "jquery";


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
      this.setState({
        user:user
      })
      console.log(this.state.user)
      // this is to set the user
      // base.fetch(`user/${user.uid}` ,{
      //   context: this,
      //   asArray: false,
      //   then(data){
      //     this.setState({ user: data})
      //     console.log(data)
      //   }
      // })
    }

    componentDidMount(){
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
    let users = this.state.users;
    let user = this.state.user;
    let uid = this.props.match.params.uid;
      return users.map((users,index) => {
        return(
          <div className="user-pic" key={index}>
            <div className="pic">
              <Link to={`/user/${uid}/profile/${users.uid}/id/${index}`}>
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


  render() {
    let user = this.state.user
    return (
      <div>
        <div className="search-users">
          <p> Search for other users </p>
          <input className="user-input" ref={(input) => {this.input = input } } type="text" />
          <button className="user-search-button"> Search </button>
        </div>
        <div className="all-users">
          { this.showUser()}
        </div>
      </div>

    );
  }
}

export default Home

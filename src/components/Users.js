import React, { Component } from 'react';
import "../css/Users.css";
import { base, app} from '../rebase';
import firebase from 'firebase';

class Users extends Component {
  constructor() {
    super()
    this.state = {
      users:[]
    }
  }

  componentDidMount(){
    base.fetch(`user` ,{
      context: this,
      asArray: true,
      then(data){
        this.setState({ users: data})
      }
    });
  }

  render(){
    let users = this.state.users
    let image = this.state.image
    let photo = require("../images/user.png")
    console.log(users)
    return(
      <div className="users-container">
        <header>
          <h1 className="card-header"> More Users </h1>
        </header>
        <div className="Card-container">
          {users.map((user, index) => {
            console.log(user.photoURL)
            return(
              <div className="" key={index}>
                <div className="Card">
                  <img className="userPhoto" src={user.photoURL ? user.photoURL : photo} />
                  <div>
                    <p>  {user.firstName} {user.lastName} </p>
                    <p> Age {user.age}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Users

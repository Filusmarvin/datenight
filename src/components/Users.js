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
    console.log(users)
    return(
      <div className="">
        <div>
          {users.map((user, index) => {
            console.log(user.photoURL)
            return(
              <div key={index}>
                <div className="Card">
                <image src={user.photoURL} />
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

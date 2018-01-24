import React, { Component } from 'react';
import "../css/Users.css";
import { base, app} from '../rebase';
import firebase from 'firebase';
import $ from "jquery";


class chatUsers extends Component {
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
        console.log(data)
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
       <p> Hello World </p>
      </div>
    )
  }
}

export default chatUsers

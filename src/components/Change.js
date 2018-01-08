import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import '../css/Login.css'
import $ from "jquery";

class Change extends Component {
  constructor() {
    super()
    this.state = {
      user:{},
    }
  }

  render() {

    return (
      <div className="">
        <h1> {`Change your `} </h1>
        <input type="text" ref={ input => {this.info = input } } />
      </div>
    );
  }
}

export default Change;

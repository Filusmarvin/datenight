import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './Login/Login.css'

class Login extends Component {
  render() {
    return (
      <container>
        <div className="container">
          <header>
            <h1> Dinner And A Date?</h1>
          </header>
          <div className="log-in-or-signup">
            <p className="intro"> Do you not hate when you ask her where do you want to go and then your thinking to yourself O I messed up big time by asking that question! Well On our site we not only help you avoid asking the question that can make it or break a relationship but give you more options then one on where to go. Sign up and check it out.... </p>
            <div className="logInOrSignUp">
              <p>Click here to Log in to your accout</p>
              <button>Login Here</button>
              <p>Or Click here to sign up!</p>
              <button> Sign up</button>
            </div>
          </div>

        </div>
      </container>
    );
  }
}

export default Login;

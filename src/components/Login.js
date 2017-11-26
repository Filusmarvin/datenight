import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import '../css/Login.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      user:{},
    }
  }

  signUp(){
    let email = this.User.value;
    let password = this.Password.value;
    this.props.createUserNameAndPassword(email, password)
  }

  signIn(){
    let email = this.email.value;
    let password = this.password.value;
    this.props.loginWithUsernameAndPassword(email, password);
  }

  render() {
    return (
      <container>
        <div className="container">
          <header className="header">
          <h1 className="app-name"> Some One To Love </h1>
          </header>
          <div className="log-in-or-signup">
            <div className="intro">
              <h1 className="intro-words"> Need help making plans on where to go? We can help! </h1>
              <ul className='intro-words intro-ul'>
                <li> Great Dinner Locations</li>
                <li> Great Date  Locations</li>
                <li> Dinner and a Date? say no more!</li>
                <li>Sign up and check it out!</li>
              </ul>
            </div>
            <div className="vertical-line"> </div>
            <div className="logInOrSignUp">
              <div className="right-side">
                <div className="sign-up">
                <h3 className="returning-user-h3"> Returning User? Log In here </h3>
                <div className="sign-in">
                  <div className="sign-in-username">
                    <p className="login-email"> Email </p>
                    <input type="text" className="login-user-input" ref={(input) => { this.email = input}} />
                  </div>
                  <div className="sign-in-password">
                    <p className="login-password"> Password </p>
                    <input type="password" className="login-user-input" ref={(input) => { this.password = input}} />
                  </div>
                  <button onClick={this.signIn.bind(this)}> Enter </button>
                </div>

                  <h3> No account? Please Sign up!</h3>
                  <div className="div-user">
                    <p className="login-email"> Email </p>
                    <input type="text" className="login-user-input" ref={ (input)=> {this.User = input}} />
                  </div>
                    <div className="div-password">
                      <p className="login-password" > Password </p>
                      <input type="text" className="login-password-input"  ref={ (input)=> {this.Password = input}} />
                    </div>
                    <button onClick={this.signUp.bind(this)}> Enter </button>
                </div>
              </div>
            </div>
          </div>
          <div className="login-methods">
            <div className="facebook-box fcebook">
              <button className="log-button hvr-grow" onClick={this.props.loginWithFacebook.bind(this)}> Login with Facebook </button>
              <a href="//Facebook.com" className="facebook-hover-box"> Log into Facebook first to log in </a>
            </div>
            <button className="log-button twitter hvr-grow" onClick={this.props.loginWithTwitter.bind(this)}> Login with Twitter </button>
            <button className="log-button google hvr-grow" onClick={this.props.loginWithGoogle.bind(this)}> Login with Gmail </button>
          </div>
        </div>
      </container>
    );
  }
}

export default Login;

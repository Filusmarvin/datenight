import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../css/Login.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      user:{},
    }
  }

  render() {
    return (
      <container>
        <div className="container">
          <header className="header">
            <h1> Dinner And A Date?</h1>
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
            <div className="logInOrSignUp">
              <div className="right-side">
                <p>Click here to Log in to your account using your Facebook account</p>
                <div>
                  <button className="log-button hvr-grow" onClick={this.props.loginWithFacebook.bind(this)}> Login with Facebook </button>
                </div>
                <p> Sign up for an account here!  </p>
                <Link to="/signup" target="_blank" className="facebook-button"> Sign Up </Link>
              </div>
              <h6> If you want to log in using a different <br />account just sign out of your facebook.
              <br /> <br /> Go to <a href="//www.Facebook.com" target="_blank"> Facebook </a>
              </h6>
            </div>
          </div>

        </div>
      </container>
    );
  }
}

export default Login;

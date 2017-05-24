import React, { Component } from 'react';
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
                <p> If you want to sign in using a different account, <a href="facebook.com"> Click Here </a>
                to log out of your facebook account then sign back in. </p>
                <a href="//facebook.com" target="_blank" className="facebook-button"> Sign Out Here </a>
              </div>
            </div>
          </div>
          <div className="bottom-section">
          <div className="div-box box-1"></div>
          <div className="div-box box-2">
          <video width="100" height="100" controls>
            <source src="What-do-you-want.mp4" type="video/mp4"/>
          </video>
          </div>
          <div className="div-box box-3"></div>
          <div className="div-box box-4"></div>
          </div>
        </div>
      </container>
    );
  }
}

export default Login;

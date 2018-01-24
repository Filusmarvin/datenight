
import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import '../css/Login.css';
import $ from "jquery";

class Login extends Component {
  constructor() {
    super()
    this.state = {
      user:{},
      emailOne: "",
      passOne: "",
      emailTwo: "",
      passTwo: ''
    }
  }

  componentDidMount(){
    const that = this;
    const passOne = this.state.passOne;
    setTimeout(function(){
      $(".login-header").attr('class', 'hid');
      $('.login').attr('class', '.login-part-two');
    }, 3000);

    $('.login-form').on('submit', function(e){
      e.preventDefault()
      let emailOne = $('.emailOne').val(); 
      if(emailOne.length !== 0){
        that.setState({emailOne : emailOne });
        $('.login-form').attr('class','hid2');
        $('.hid3').attr('class', 'login-form2');
        $('.passOne').val("")
      }
    })

    $('.pass').on('submit',function(event){
      event.preventDefault()
      let passOne = $('.passOne').val();
      console.log(passOne.length) ;
      if(passOne.length !== 0){
        that.setState({ passOne: passOne });
      } else{ null }
      $('.hid2').attr('class','login-form');
      $('.login-form2').attr('class', 'hid3 pass');
      that.signIn()
    })
    // Sign up for the first time
    $('.first-time').on('click', function(){
      $('.signIn-sec').attr('class', 'hid4');
      $('.hid5').attr('class', 'signUp-sec');
    })

    $('.login-form3ogin').on('submit', function(e){
      e.preventDefault();

    })
  }

  signUp(){
    let email = this.User.value;
    let password = this.Password.value;
    this.props.createUserNameAndPassword(email, password)
  }

  signIn(){
    let email = this.state.emailOne;
    let password = this.state.passOne;
    console.log(email, password)
    if(this.state.passOne !== ""){
      this.props.loginWithUsernameAndPassword(email, password);
    }
  }

  render() {
    return (
      <container>
        <div className="container">
          <header className="login-header">
            <h1 className="header-animation-one"> Welcome to </h1>
          </header>     
          <section className="login">
            <h1 className="header-animation-two">Date  Night</h1>
            <div className="middle-sect"> 
              <div className="left-login login-sec">
                <p> Just to pus something here </p>
              </div>

              <div className="middle-login login-sec">
                <div className="signIn-sec">  
                  <h1> Please Log In </h1>
                  <form className="login-form"> 
                    <label> Email </label>
                    <input className="emailOne" type="text" autoFocus />
                  </form>

                  <form className="hid3 pass"> 
                    <label> Password </label>
                    <input type="password" className="passOne" />
                  </form>

                  <p className="first-time hvr-grow"> Click here to sign up for the first time </p>
                </div>

                <div className="hid5">
                  <h2> To sign up enter an email address </h2>
                  <form className="login-form3"> 
                    <label> Email </label>
                    <input className="emailTwo" type="text" />
                  </form>

                  <form className="hid4 pass"> 
                    <label> Password </label>
                    <input type="password" className="passTwo" />
                  </form>
                </div>
              </div>
              <div className="right-login login-sec">
                <p> Just to put something here </p>
              </div>
            </div>
          </section> 
        </div>     
      </container>
    );
  }
}

export default Login;

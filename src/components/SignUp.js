import React, { Component } from 'react';
import  { Link } from 'react-router-dom'
// import base from '../rebase';
import '../css/Signup.css'
// import data from '../components/data.json'

class Signup extends Component {
  constructor () {
    super();
    // data.forEach( obj => {
    // 	let goodPath = require(obj.picture);
    //   obj.goodPath = goodPath;
    // })
    this.state = {

    }
  }
accountInfo(e){
  e.preventDefault();
  let firstName =  this.firstName.value;
  let lastName =  this.lastName.value;
  let restaraunt =  this.restaraunt.value;
  let hobby = this.hobby.value;
  let movie =  this.movie.value;
  let genre =  this.genre.value;
  console.log(firstName, lastName, restaraunt, hobby,
  movie, genre)
}



 opacityOne () {
  this.everything.style.opacity = 1;
 }

  render() {
    return (
      <div className="create-an-account" >
        <header className="login-header" >
          <h1> Welcome New User! </h1>
        </header>

        <Link to="/" className="backhome"> Back to the Home Login </Link>

        <div className="everything" onClick={this.opacityOne.bind(this)}
          ref={(div) => { this.everything = div; }} >
          <header className="header-number2">
          <p className="side">  Please provide us with this information.</p>
          <p className="side sidenote">  Sidenote: Everything marked with a * is required. </p>
          </header>
          <div className="left-and-right">
            <section className="left new-info">
              <p className="sidenote"> Sidenote: </p>
              <p> Everything marked with a * is required. </p>
              <form>
                <li className="new-li"> <p className="new-p"> First Name*    </p> <input className="input-new " type="text"
                ref={(input) => { this.firstName = input;} }/> </li>
                <li className="new-li"> <p className="new-p"> Last Name*    </p> <input className="input-new " type="text"
                ref={(input) => { this.lastName = input;} }/> </li>
                <li className="new-li"> <p className="new-p"> Favorite Restaraunt </p> <input className="input-new " type="text"
                ref={(input) => { this.restaraunt = input;} }/> </li>
                <li className="new-li"> <p className="new-p"> Favorite Hobby </p> <input className="input-new " type="text"
                ref={(input) => { this.hobby = input;} }/> </li>
                <li className="new-li"> <p className="new-p"> Favorite Movie</p> <input className="input-new " type="text"
                ref={(input) => { this.movie = input;} }/> </li>
                <li className="new-li"> <p className="new-p"> Favorite Movie Genre </p> <input className="input-new " type="text"
                ref={(input) => { this.genre = input;} }/> </li>
                <button onClick={this.accountInfo.bind(this)}> submit </button>
              </form>
            </section>
            <section className="right new-info">
            {/*this.state.data.map((data, index) =>{
              console.log(data.goodPath)
              return(
                <div>
                  <img src={data.goodPath} alt="Date"/>
                  <img src={data.goodPath} alt="funny"/>
                  <img src={data.goodPath} alt="lover"/>
                  <img src={data.goodPath} alt="winner"/>
                </div>
              )
            })*/}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;

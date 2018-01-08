import React, { Component } from 'react';
// import  { Link } from 'react-router-dom'
import { base } from '../rebase';
import '../css/Signup.css';
import $ from "jquery";
// import data from '../components/data.json'

class Signup extends Component {
  constructor () {
    super()
    this.state = {
      boo: 1,
      gender: null
    }
  }

  componentDidMount(){
    this.setState({ user: this.props.user})
  }
  show(val){
    console.log(val)
    let boo = this.state.boo;
    let value = val.target.innerHTML;
    console.log(value.length);
    let uid = this.props.match.params.uid;
   let firstName = this.firstName.value;
   let lastName = this.lastName.value;
   let age = this.age.value;
   let city = this.city.value;
   let ethnicity = this.ethnicity.value;
   let restaraunt = this.restaraunt.value;
   let hobby = this.hobby.value;
   let movie = this.movie.value;
   let genre = this.genre.value;

   if ( boo === 1){
    this.setState({
        boo: boo + 1
      })
   }
    else if ( boo === 2 && firstName !== ""){
      this.setState({
        boo: boo + 1
      })
    } else if ( boo === 3 && lastName !== ""){
      this.setState({
        boo: boo + 1
      })
    } else if ( boo === 4 && age !== ""){
      this.setState({
        boo: boo + 1
      })
    } else if ( boo === 5 && ethnicity !== ""){
      this.setState({
        boo: boo + 1
      })
    } else if ( boo === 6 && city !== ""){
      this.setState({
        boo: boo + 1
      })
    } else if ( boo === 7 && value === "Male" ){
      this.setState({
        gender: "Male",
        boo: boo + 1
      })
     } else if ( boo === 7 && value === "Female" ){
      this.setState({
        gender: "Female",
        boo: boo + 1
      })
      console.log(this.state.gender)
     } else if ( boo === 8 && restaraunt !== ""){
      this.setState({
        boo: boo + 1
      })
    } else if ( boo === 9   && hobby !== ""){
      this.setState({
        boo: boo + 1
      })
    } else if ( boo === 10 && movie !== ""){
      this.setState({
        boo: boo + 1
      })
    } else if ( boo === 11 && genre !== ""){
      this.setNewUser()
      this.setState({
        boo: boo + 1
      })
      console.log(boo)
    } 
  }

 newUser(e){
  e.preventDefault();
  // console.log('something')
 }



 setNewUser( ){
   let uid = this.props.match.params.uid
   let firstName = this.firstName.value
   let lastName = this.lastName.value
   let age = this.age.value
   let city = this.city.value
   let ethnicity = this.ethnicity.value
   let restaraunt = this.restaraunt.value
   let hobby = this.hobby.value
   let movie = this.movie.value
   let genre = this.genre.value
   let gender = this.state.gender
   console.log(gender)
   console.log( firstName, lastName, gender, city, age, ethnicity, restaraunt, hobby, movie, genre, gender)
   base.update(`user/${uid}`,{
     data:{
       firstName:firstName,
       lastName:lastName,
       age:age,
       ethnicity: ethnicity,
       restaraunt:restaraunt,
       hobby:hobby,
       movie:movie,
       genre:genre,
       gender:gender,
       city:city
     }
   })
   base.fetch(`user/${uid}`, {
     context: this,
     asArray:false,
     then(data){
       this.setState({
         user:data
       })
     }
   })
   window.location.assign(`/user/${uid}`)
 }


  render() {
    let display = this.state.boo
    return (
      <div className="create-an-account" >

      <header className="new-user-header">
        <h1>Welcome to Dinner and a Date</h1>
        <h2> We just have some information for you to fill out so we can continue </h2>
        <button className={ display === 1 ? "next-button" : "hidden"} onClick={this.show.bind(this)}> Next </button>
      </header>

      <div className="outer-box">

      <div className={display === 2 ? "box firstName" : "hidden"}>
        <p className="sign-up firstName"> First what is your First name? </p>
        <form onSubmit={this.newUser.bind(this)}>
          <input type="text" className="sign-up input-text" placeholder="First Name" style={{textAlign:"center"}}
          ref={(input) => { this.firstName = input }}/>
            <button className="sign-up sign-up-button" onClick={ this.show.bind(this)}> Next </button>
        </form>
      </div>

      <div className={ display === 3 ? "box lastName" : "hidden"}>
        <p className="sign-up lastName"> What is you Last Name? </p>
        <form onSubmit={this.newUser.bind(this)}>
          <input type="text" className="sign-up input-text" placeholder="Last Name" style={{textAlign:"center"}}
          ref={(input) => { this.lastName = input }}/>
          <br />
          <button className="sign-up sign-up-button" onClick={ this.show.bind(this)}> Next </button>
        </form>
      </div>

      <div className={display === 4 ? "box age" : "hidden"}>
        <p className="sign-up age"> How old are you? </p>
        <form onSubmit={this.newUser.bind(this)}>
          <input type="text" className="sign-up input-text" placeholder="Your Age" style={{textAlign:"center"}}
          ref={(input) => { this.age = input }}/>
          <br />
          <button className="sign-up sign-up-button" onClick={ this.show.bind(this)}> Next </button>
        </form>
      </div>

      <div className={display === 5 ? "box ethnicity" : "hidden"}>
        <p className="sign-up age"> What is your Ethnicity? </p>
        <form onSubmit={this.newUser.bind(this)}>
          <input type="text" className="sign-up input-text" placeholder="Your ethnicity" style={{textAlign:"center"}}
          ref={(input) => { this.ethnicity = input }}/>
          <br />
          <button className="sign-up sign-up-button" onClick={ this.show.bind(this)}> Next </button>
        </form>
      </div>

      <div className={display === 6 ? "box city" : "hidden"}>
        <p className="sign-up city"> What City are you from? </p>
        <form onSubmit={this.newUser.bind(this)}>
          <input type="text" className="sign-up input-text" placeholder="Your City" style={{textAlign:"center"}}
          ref={(input) => { this.city = input }}/>
          <br />
          <button className="sign-up sign-up-button" onClick={ this.show.bind(this)} > Next </button>
        </form>
      </div>

      <div className={display === 7 ? "box gender" : "hidden"}>
        <p className="sign-up gender"> What is your Gender? </p>
        <form onSubmit={this.newUser.bind(this)}>
        <div className="gender-button">

          <button className='the-gender male' value="Male"
          onClick={this.show.bind(this)} >Male</button>

          <button className='the-gender female' value="Female" 
          onClick={this.show.bind(this)} >Female</button>
        </div>
          <br />
          <button className="sign-up sign-up-button" onClick={ this.show.bind(this)} > Next </button>
        </form>
      </div>

      <div className={display === 8 ? "box restaraunt" : "hidden"}>
        <p className="sign-up restaraunt"> Where do you like to eat? </p>
        <form onSubmit={this.newUser.bind(this)}>
          <input type="text" className="sign-up input-text" placeholder="Where do you like to eat" style={{textAlign:"center"}}
          ref={(input) => { this.restaraunt = input }}/>
          <br />
          <button className="sign-up sign-up-button" onClick={ this.show.bind(this)}> Next </button>
        </form>
      </div>


      <div className={display === 9 ? "box hobby" : "hidden"}>
        <p className="sign-up hobby"> What do you do for fun? </p>
        <form onSubmit={this.newUser.bind(this)}>
          <input type="text" className="sign-up input-text" placeholder="Hobby" style={{textAlign:"center"}}
          ref={(input) => { this.hobby = input }}/>
          <br />
          <button className="sign-up sign-up-button" onClick={ this.show.bind(this)}> Next </button>
        </form>
      </div>

      <div className={display === 10 ? "box movie" : "hidden"}>
        <p className="sign-up movie"> What is your favorite movie? </p>
        <form onSubmit={this.newUser.bind(this)}>
          <input type="text" className="sign-up input-text" placeholder="Favorite Movie" style={{textAlign:"center"}}
          ref={(input) => { this.movie = input }}/>
          <br />
          <button className="sign-up sign-up-button" onClick={ this.show.bind(this)}> Next </button>
        </form>
      </div>


      <div className={display === 11 ? "box movie-genre" : "hidden"}>
        <p className="sign-up genre"> What is your favorite movie genre? </p>
        <form onSubmit={this.newUser.bind(this)}>
          <input type="text" className="sign-up input-text" placeholder="Movie Genre" style={{textAlign:"center"}}
          ref={(input) => { this.genre = input }}/>
          <br />
          <button className="sign-up sign-up-button" onClick={ this.show.bind(this)} > Next </button>
        </form>
      </div>
      </div>
      </div>
    );
  }
}

export default Signup;

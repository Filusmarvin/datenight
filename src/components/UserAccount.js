import React, { Component } from 'react';
// import {Link } from 'react-router-dom';
// import { app } from '../rebase';
import "../css/useraccount.css";
import UsersColumn from "./UsersColumn.js";
import { base } from '../rebase';
import $ from "jquery";


class UserAccount extends Component{

  constructor(){
    super();
    this.state = {
      user:{ restaraunt:"" },
      movies: []
    }
  }

  componentDidMount(){
    $(".jquery-button").on('click', function () {
      console.log('it worked!!')
    }) 

    if(this.props.user.genre){
      this.setState({
        user: {...this.state.user,...this.props.user}
      })
    }else{
      base.fetch(`user/${this.props.match.params.uid}`,{
        context:this,
        asArray:false,
        then(data){
          this.setState({user:{...this.state.user, ...data}})
        }
      })
    }

  }

  

  addBio(e){
    // e.preventDefault()
    let uid = this.props.user.uid
    let text = e.target.previousSibling.value
    this.setState({
      user:{...this.state.user, bio: text }
  })
    base.update(`user/${uid}`, {
      data:{
        bio: text
      }
    }).then( location.reload())
  }

  updateBio(){
    let uid = this.props.user.uid
    let user = this.state.user
    base.fetch(`user/${uid}`,{
      context:this,
      asArray: false,
      then(data){
        this.setState({
          user:{...user, ...data}
        },this.addBio.bind(this))
      }
    })
  }

  inputBio(){
     return(
       <div>
       <h1 className="bio-h1"> Tell me about yourself! </h1>
        <form onSubmit={this.addBio.bind(this)}>
          <textarea className="bio-input" type="text" contenteditable="true"
          ref={(textarea) => {this.text = textarea} }/>
          <div>
            <button onClick={this.addBio.bind(this)} className="bio-button"> Enter </button>
            <button onClick={this.updateBio.bind(this) } className="bio-cancel-button"> Cancel</button>
          </div>
        </form>
       </div>
     )
  }

  showBio(){
    return(
      <div className="bio-box">
        <h1 className="bio-header summary-div " onClick={this.editBio.bind(this)}> My Self Summary <img className="edit-logo" src={require('../images/edit.png')} alt="logo" /> </h1>
        <h2 className="bio-info"> {this.props.user.bio} </h2>
      </div>
    )
  }

  editBio(){
    let user = this.state.user
    this.setState({
      user: {...user, bio: null}
    })
  }

  goals(){
    return(
      <form onSubmit={this.addGoal.bind(this)}>
        <textarea className="extra-text-box" placeholder="Make it interesting :) "type="text" ref={(textarea) => {this.text = textarea} }/>
        <div className="save-cancel-div"> 
          <button  className="save save-extra-button"> Save </button>
          <button  className=" cancel save-extra-button"> Cancel </button>
        </div>
      </form>

    )
  }

  addGoal(e){
    e.preventDefault()
    let uid = this.props.user.uid
    let text = e.target.querySelector('.extra-text-box').value
    let name = e.target.previousSibling.className
    console.log(text, name)
    base.update(`user/${uid}`, {
      data:
        {[name]: text}
    })
      this.setState({
        user:{...this.state.user, [name]: text }
    })
  }

  editInfo(e){
   console.log('hi');
  }

  getPic(){
    const user = this.state.user;
    let photo = '../images/user.png';
    console.log(photo)
    return(
      <div className="pic-name">
        <h1 className="helloUser"> {user.uid ? user.displayName : 'User'}  </h1>
        <img src={user.photoURL ? user.photoURL : photo} className="userPhoto" alt="Profile"/>
      </div>
    )
  }

  showPic(){
    const user = this.state.user
    return (
    <div className="pic-name">
      <h1 className="helloUser"> {user.uid ? user.displayName : 'User'}  </h1>
      <img src={user.photoURL ? user.photoURL : null} className="userPhoto" alt="Profile"/>
    </div>)
  }


  editExtra(e){
    let uid = this.props.user.uid
    let name = e.target.parentElement.className
    console.log(name);
    base.update(`user/${uid}`,{
      data: 
        {[name]: null }
    })
    this.setState({ user: {...this.state.user, [name]: null }
  })

  }
    

  render () {
    const user = this.state.user
    const photo = require("../images/user.png"); 
    console.log(photo)
    console.log(user.photoURL)
    return (
      <div>

        <div className="userAccount">
          <header className={user.gender === "Male" ? "userHeader male-color" : "userHeader female-color"}>
            <div className="display-info">
              <img className='user-img' src={photo} />
            </div>
            <div className="bio">
            { user.bio ? this.showBio() : this.inputBio()}
             </div>
          </header>
          <div className='backHome'>
            <h2>Sign out here</h2>
            <button className="backHome-button" onClick={this.props.logOut.bind(this)}> Back to home </button>
          </div>
          <div className="userContainer">
            <div className="left-section">
              <div className='email-city'>
                <p> { user.email ? <p> Email: {user.email} </p> : null } { user.phoneNumber ? "Phone Number:" + user.phoneNumber : null}</p>
                <p> View <a href={`//www.facebook.com`} target="_blank"><span className="accountURL ">{user.displayName}</span></a> Facebook </p>
                <p> City: <span className="user-info">{user.city}</span>   </p>
              </div>
              <div className="more-users">
                < UsersColumn />
              </div>
            </div>
            <div className="big-about">
              <div className="aboutBox">
                <h1 className="aboutBox-h1">About {user.displayName}</h1>
                <form className="about-form">
                  <div>
                    <li className="about-li" onClick={this.editInfo.bind(this)}>  My name is: <span id="" className="user-info">{user.firstName} {user.lastName}</span>  <img id="" src={require('../images/edit.png')} alt="logo" /></li>
                    <li className="about-li" id="age" onClick={this.editInfo.bind(this)}> I am  <span id="age" className="user-info">{user.age}</span> years old <img id="age"src={require('../images/edit.png')} alt="logo" /> </li>
                    <li className="about-li" id="ethnicity" onClick={this.editInfo.bind(this)}> Ethnicity: <span id="ethnicity" className="user-info">{user.ethnicity}</span>  <img id="ethnicity" src={require('../images/edit.png')} alt="logo" /></li>
                  </div>
                  <div>
                    <li className="about-li" id="restaurant" onClick={this.editInfo.bind(this)}> Restaraunt: <span id="restaraunt" className="user-info">{user.restaraunt}</span>  <img id="restaraunt" src={require('../images/edit.png')} alt="logo" /></li>
                    <li className="about-li" id="hobby" onClick={this.editInfo.bind(this)}> Hobby: <span id="hobby" className="user-info">{user.hobby}</span>  <img id="hobby" src={require('../images/edit.png')} alt="logo" /></li>
                    <li className="about-li" id="movie" onClick={this.editInfo.bind(this)}> Favorite Movie <span id="movie" className="user-info">{user.movie}</span> <img id="movie" src={require('../images/edit.png')} alt="logo" /></li>
                  </div>
                </form>
              </div>

              <div className="bottom-interesting-section">
                <h2 className="spice-it-up"> It is good to have an interesting profile. Spice it up!</h2>

                <div className="interesting">

                  <div className="interesting-info">
                    <h2 className="goals" onClick={this.editExtra.bind(this)}>What am I doing with my life? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                    { user.goals  ? <p  className="more-users-info"> {user.goals} </p> : this.goals() }
                  </div>

                  <div className="interesting-info">

                  <h2 className="attraction" onClick={this.editExtra.bind(this)}> What is your biggest turn off? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                    { user.attraction  ? <p className="more-users-info"> {user.attraction} </p> : this.goals() }
                    </div>
                  <div className="interesting-info">

                    <h2 className="describe" onClick={this.editExtra.bind(this)}> What are the 5 best words to describe myself? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                    { user.describe  ? <p className="more-users-info"> {user.describe} </p> : this.goals() }
                  </div>
                  <div className="interesting-info">

                    <h2 className="peeves" onClick={this.editExtra.bind(this)}> What are your biggest pet peeves?<img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                    { user.peeves  ? <p className="more-users-info"> {user.peeves} </p> : this.goals() }
                  </div>
                  <div className="interesting-info">

                    <h2 className="flaws" onClick={this.editExtra.bind(this)}> What are my 3 biggest flaws? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                    { user.flaws  ? <p className="more-users-info"> {user.flaws} </p> : this.goals() }
                  </div>
                  <div className="interesting-info">

                    <h2 className="addiction" onClick={this.editExtra.bind(this)}> What are 6 things that you can not live with out? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                    { user.addiction  ? <p className="more-users-info"> {user.addiction} </p> : this.goals() }
                  </div>
                  <div className="interesting-info">

                    <h2 className="fun"  onClick={this.editExtra.bind(this)}> What are something that you do for fun? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                    { user.fun  ? <p className="more-users-info"> {user.fun} </p> : this.goals() }
                  </div>

                  <div className="interesting-info">
                    <h2 className="bucketList" onClick={this.editExtra.bind(this)}> What are 5 things you want to do before you die?<img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                    { user.bucketList  ? <p className="more-users-info"> {user.bucketList} </p> : this.goals() }
                  </div>
                  <div className="interesting-info">

                  <h2 className="powers" onClick={this.editExtra.bind(this)}>  If you could have any superpower, what power would it be and why? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                    { user.powers  ? <p className="more-users-info"> {user.powers} </p> : this.goals() }
                  </div>
                </div>
              </div>
            </div>

            <div className="right-section"> 
              <p> Just to put something here </p> 
            </div>

          </div>
        </div>
      </div>
    )
  }
}



export default UserAccount

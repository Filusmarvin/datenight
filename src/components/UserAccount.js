import React, { Component } from 'react';
// import {Link } from 'react-router-dom';
// import { app } from '../rebase';
import "../css/useraccount.css";
import { base, app} from '../rebase';
import firebase from 'firebase';
// import axios from 'axios'
// const movieKey = "81599007ff214265c13a0888da791d0c"
// const dinnerKey = "31060f9bfe02586b"
// const dinKey ="179f6b05297ee5efce0b417a891b2dc5"
// const googleKey ="AIzaSyBtc85u3wl0NOfEm8zsCkqBCSYRMHvJkAA"

class UserAccount extends Component{

  constructor(){
    super();
    this.state = {
      user:{ restaraunt:"" },
      movies: [],
      change: false
    }
  }

  componentDidMount(){

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
          <textarea className="bio-input" type="text" placeholder=" Write something interesting about yourself. Don't let them know too much about you but let them know what you are about :) "
          ref={(textarea) => {this.text = textarea} }/>
          <button onClick={this.addBio.bind(this)} className="bio-button"> Enter </button>
          <button onClick={this.updateBio.bind(this) } className="bio-cancel-button"> Cancel</button>
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

  showAge(){
    let user = this.state.user
    return(
      <li className="about-li" id="age" onClick={this.editInfo.bind(this)}> I am  <span id="age" className="user-info">{user.age}</span> years old <img id="age"src={require('../images/edit.png')} alt="logo" /> </li>
    )
  }

  showEthnicity(){
    let user = this.state.user
    return(
      <li className="about-li" id="ethnicity" onClick={this.editInfo.bind(this)}> Ethnicity: <span id="ethnicity" className="user-info">{user.ethnicity}</span>  <img id="ethnicity" src={require('../images/edit.png')} alt="logo" /></li>
    )
  }

  showRestaurant(){
    let user = this.state.user
    return(
      <li className="about-li" id="restaurant" onClick={this.editInfo.bind(this)}> Restaraunt: <span id="restaraunt" className="user-info">{user.restaraunt}</span>  <img id="restaraunt" src={require('../images/edit.png')} alt="logo" /></li>
    )
  }

  showHobby(){
    let user = this.state.user
    return(
      <li className="about-li" id="hobby" onClick={this.editInfo.bind(this)}> Hobby: <span id="hobby" className="user-info">{user.hobby}</span>  <img id="hobby" src={require('../images/edit.png')} alt="logo" /></li>
    )
  }

  showMovie(){
    let user = this.state.user
    return(
      <li className="about-li" id="movie" onClick={this.editInfo.bind(this)}> Favorite Movie <span id="movie" className="user-info">{user.movie}</span> <img id="movie" src={require('../images/edit.png')} alt="logo" /></li>
    )
  }

  editInfo(e){
    // let user = this.state.user
    let id = e.target.id
    this.enterInfo(id)
  }

  enterInfo(id){
    // let name = document.querySelector('.change')


  }

  goals(){
    return(
      <form onSubmit={this.addGoal.bind(this)}>
        <textarea className="extra-text-box" placeholder="Make it interesting :) "type="text" ref={(textarea) => {this.text = textarea} }/>
        <button  className="save save-extra-button"> Save</button>
        <button  className=" cancel save-extra-button"> Cancel</button>
      </form>

    )
  }

  addGoal(e){
    e.preventDefault()
    let uid = this.props.user.uid
    let text = e.target.querySelector('.extra-text-box').value
    let name = e.target.previousSibling.className
    base.update(`user/${uid}`, {
      data:
        {[name]: text}
    })
      this.setState({
        user:{...this.state.user, [name]: text }
    })
  }

  getDisplayName(){
    let user = this.state.user
    if(user.profileName){

    } else {
      return(
        <div>
          <h2> Display name? </h2>
          <form onSubmit={this.setName.bind(this)}>
             <input type="<text></text>"  ref={ (input) => {this.display = input }}/>
             <button> Enter </button>
          </form>
        </div>
      )
    }
  }

  setName(e){
    e.preventDefault()
    let name = this.display.value
    let uid = this.state.user.uid
    let user = this.state.user
    base.update(`user/${uid}`,{
      data:{ displayName: name }
    })
    base.fetch(`user/${uid}`,{
      context:this,
      asArray:false,
      then(data){
        console.log(data)
        this.setState({ user: {...user, displayName: data.displayName}})
      }
    })
  }

  showDisplayName(){
    const user = this.state.user
    return (
    <div className="pic-name">
    <h1 className="helloUser"> {user.uid ? user.displayName : 'Hello User'}  </h1>
      <div className="pic-info">
        <div>
          <img src={user.photoURL ? user.photoURL : null} className="userPhoto" alt="Profile"/>
        </div>
        <div className='email-city'>
          <p className="email-p one-p">Email: {user.email}</p>
          <p className="email-p two-p"> View <a href={`//www.facebook.com`} target="_blank"><span className="accountURL ">{user.displayName}</span></a> Facebook </p>
          <p className="email-p three-p"> City: <span className="user-info">{user.city}</span>   </p>
        </div>
        </div>
    </div>
    )
  }

  something(){
  //     console.log('event',event)
  //     console.log('this',this.fileButton.files[0])
  //     var file = this.fileButton.files[0]
  //     //Create a storage ref
  //     var storageRef = app.storage().ref(this.state.user.uid+'/photos/'+file.name);
  //     //Upload file
  //     var uploadTask = storageRef.put(file);
  //
  //
  //     // Listen for state changes, errors, and completion of the upload.
  //     uploadTask.on( app.storage.STATE_CHANGED, // or 'state_changed'
  //       (snapshot) => {
  //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //         var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //         this.setState({
  //           addPhotoButtonText: 'uploading...'+progress+'%'
  //         })
  //         console.log('Upload is ' + progress + '% done');
  //         switch (snapshot.state) {
  //           case base.storage.TaskState.PAUSED: // or 'paused'
  //             console.log('Upload is paused');
  //             break;
  //           case base.storage.TaskState.RUNNING: // or 'running'
  //             console.log('Upload is running');
  //             break;
  //         }
  //       }, (error) => {
  //
  //       // A full list of error codes is available at
  //       // https://firebase.google.com/docs/storage/web/handle-errors
  //       switch (error.code) {
  //         case 'storage/unauthorized':
  //           // User doesn't have permission to access the object
  //           break;
  //         case 'storage/canceled':
  //           // User canceled the upload
  //           break;
  //         case 'storage/unknown':
  //           // Unknown error occurred, inspect error.serverResponse
  //           break;
  //       }
  //     }, () => {
  //       // Upload completed successfully, now we can get the download URL
  //       var downloadURL = uploadTask.snapshot.downloadURL;
  //       console.log('downloadURL:',downloadURL)
  //       this.setState({
  //         imgsrc: downloadURL,
  //         addPhotoButtonText: 'Add Photo'
  //       })
  //     });
  //
  //
    }

  editExtra(e){
    let clicked = e.target.querySelector('form')
    console.log(clicked)
  }

  render () {
    const user = this.state.user
    const change = this.state.change
    return (
      <div>
        <div className="userAccount">
          <header className="userHeader">
            <div>
              {this.state.user.displayName ? this.showDisplayName(): this.getDisplayName()}
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
          <div className="under-header">

          <div>
              <div className={ change ? "change" : 'hidden'}>
                <h1> Change your information </h1>
                <textarea className="change-input" type="text"  rows="4" placeholder=" Change your information" />
                <div>
                  <button className="change-submit"> Submit </button>
                  <button className="change-cancel">  Cancel </button>
                </div>

               </div>
            <div className="aboutBox">
              <div className="about-event">
                <div className="left-about-box">
                  <h1 className="aboutBox-h1">About {user.displayName}</h1>
                  <form className="about-form">
                    <div className="about-left">
                      <li className="about-li" id="name" onClick={this.editInfo.bind(this)}>  My name is:
                       <span id="name" className="user-info">{user.firstName} {user.lastName}</span>
                        <img id="name" src={require('../images/edit.png')} alt="logo" /></li>
                      {user.age ? this.showAge() : this.enterInfo() }
                      { user.ethnicity ? this.showEthnicity() : this.enterInfo() }
                      </div>
                    <div>
                      { user.ethnicity ? this.showRestaurant() : this.enterInfo() }
                      { user.ethnicity ? this.showHobby() : this.enterInfo() }
                      { user.ethnicity ? this.showMovie() : this.enterInfo() }
                    </div>
                  </form>
                </div>
                <div className="right-event-box">
                  <h1> Events near {user.displayName} </h1>
                  <div>
                  <input id="fileButton" name="fileButton" ref={(input) => { this.fileButton = input; }} type="file" accept="image/*" capture="camera" onChange={this.something.bind(this)} />
                  </div>
                </div>
              </div>
            </div>
          </div>

              <div>
                <h2> It is good to have an interesting profile. Spice it up!</h2>

                <div className="interesting">

                <div>
                  <h2 className="goals" onClick={this.editExtra.bind(this)}>What am I doing with my life? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                  { user.goals  ? <p  className="more-users-info"> {user.goals} </p> : this.goals() }
                </div>

                <div>

                <h2 className="attraction" onClick={this.editExtra.bind(this)}> What is your biggest turn off? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                { user.attraction  ? <p className="more-users-info"> {user.attraction} </p> : this.goals() }
                </div>
                <div>

                <h2 className="describe" onClick={this.editExtra.bind(this)}> What are the 5 best words to describe myself? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                { user.describe  ? <p className="more-users-info"> {user.describe} </p> : this.goals() }
                </div>
                <div>

                <h2 className="peeves" onClick={this.editExtra.bind(this)}> What are your biggest pet peeves?<img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                { user.peeves  ? <p className="more-users-info"> {user.peeves} </p> : this.goals() }
                </div>
                <div>

                <h2 className="flaws" onClick={this.editExtra.bind(this)}> What are my 3 biggest flaws? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                { user.flaws  ? <p className="more-users-info"> {user.flaws} </p> : this.goals() }
                </div>
                <div>

                <h2 className="addiction" onClick={this.editExtra.bind(this)}> What are 6 things that you can not live with out? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                { user.addiction  ? <p className="more-users-info"> {user.addiction} </p> : this.goals() }
                </div>
                <div>

                <h2 className="fun"  onClick={this.editExtra.bind(this)}> What are something that you do for fun? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                { user.fun  ? <p className="more-users-info"> {user.fun} </p> : this.goals() }
                </div>
                <div>

                <h2 className="bucketList" onClick={this.editExtra.bind(this)}> What are 5 things you want to do before you die?<img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                { user.bucketList  ? <p className="more-users-info"> {user.bucketList} </p> : this.goals() }
                </div>
                <div>

                <h2 className="powers" onClick={this.editExtra.bind(this)}>  If you could have any superpower, what power would it be and why? <img className="edit-info-logo" src={require('../images/edit.png')} alt="logo" /></h2>
                { user.powers  ? <p className="more-users-info"> {user.powers} </p> : this.goals() }
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default UserAccount

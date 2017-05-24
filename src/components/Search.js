import React, { Component } from 'react';
 import {Link } from 'react-router-dom'
import axios from 'axios'
import '../css/search.css'
const movieKey = "81599007ff214265c13a0888da791d0c"
const dinnerKey = "31060f9bfe02586b"
const dinKey ="179f6b05297ee5efce0b417a891b2dc5"

class UserAccount extends Component{
  searchMovies(){
    let movie = this.props.user.movie
    return movie
  }
  viewMore(index){
    if(index !== index){
      console.log(index)
      this.div.show()
    }
  }
  moreMovies(params){
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${params}`)
    .then(results => results).then(obj => obj.data.results.map( (obj,index) => {
      return (
        <form>
          <img src={obj.backdrop_path} alt={index}/>
          <li>obj.original_title</li>
          <li> this.obj.id </li>
          <li>obj.release_date</li>
          <li>obj.popularity</li>
          <button onClick={this.viewMore.bind(this,index)}> View More Info About Movie </button>
          <div className={}ref={(div) => {this.div = div;}}>
            I want this to be shown right now
          </div>
        </form>
      )
    }))
  }

  render()
  {
    const user = this.props.user
    const empty = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj1l7LggvrTAhUFRSYKHRBnDKMQjRwIBw&url=https%3A%2F%2Fpixabay.com%2Fen%2Fblank-profile-picture-mystery-man-973460%2F&psig=AFQjCNG-W1WQxehgRdPSYMv5mg5YJ2SmVw&ust=1495216794447962"
    return (
      <div>
      <header className="search-header">
        <h1> Your Favorite Movies and Dinner Locations</h1>
      </header>
      <img src={user.photoURL ? user.photoURL : empty} className="userPhoto" alt="Profile"/>
      <h2> Your Favorite Movie is {this.searchMovies()}</h2>
      <p>Here are more movies based on your favorite Movie</p>
      {this.moreMovies(user.movie)}
      </div>
    )
  }
}

export default UserAccount

import React, { Component } from 'react';
 // import {Link } from 'react-router-dom'
import axios from 'axios'
import '../css/search.css'
const movieKey = "81599007ff214265c13a0888da791d0c"
// const dinnerKey = "31060f9bfe02586b"
// const dinKey ="179f6b05297ee5efce0b417a891b2dc5"
// const googleKey="AIzaSyAhoxu3waM5qMIQHwXGZ4Gcq7VuDcRohtU"


class UserAccount extends Component{

  constructor(){
    super()
    this.state={
      movies:"",
      genre:"",
      place:"",
      date:"",
      location:{}
    }
  }

  componentDidMount () {
    axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAhoxu3waM5qMIQHwXGZ4Gcq7VuDcRohtU")
    .then(obj => {
      this.setState({
        location:obj.data.location
      })
    })
  }



  viewMore(index){
    if(index !== this.index){
      console.log(index)
      this.div.show()
    }
  }



// Api Search Calls

  searchMovie(event){
    event.preventDefault()
    let params = this.input.value
    console.log(params)
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${params}&total_results=10`)
    .then( obj => this.setState({
      movies:obj.data.results
    }))
  }

  searchGenre(e){
    e.preventDefault()
    let id = e.target.value
    console.log(id)
    return axios.get(`https://api.themoviedb.org/3/genre/${id}/movies?api_key=${movieKey}&total_results=10`)
    .then( obj => this.setState({
      genre:obj.data.results
    }))
  }

  searchPlaces(event){
    event.preventDefault()
    let params = this.dinners.value
    console.log(params)
    let lat = this.state.location.lat
    let long = this.state.location.lng
    axios.get(`http://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json?&query=${params}&location=${lat},${long}&radius=500&key=AIzaSyAhoxu3waM5qMIQHwXGZ4Gcq7VuDcRohtU`)
    .then(obj => {
      this.setState({
        place: obj.data.results
      })
      console.log(this.state.place)
    })
  }


  // This is to display all my searches


  displayMovies(){
    let movies = this.state.movies
    // console.log(movies)
    if(movies !== ""){
      return movies.map((movie,index) => {
        return(
          <div className="each-movie" key={index}>
            <img src={movie.backdrop_path} alt="this" />
            <li> Movie Name: {movie.title} </li>
            <li>Movie Id: {movie.id}</li>
            <li> Votes: {movie.vote_average} and Vote count {movie.vote_count}</li>
            <button onClick={this.addToDo.bind(this)}> Add to do </button>
          </div>
        )
      })
    }
  }

  displayGenre(){
    let genre = this.state.genre
    // console.log(movies)
    if(genre !== ""){
      return genre.map((genre, index) => {
        return(
          <div className="eachgenre" key={index}>
            <img src={genre.backdrop_path} alt="this" />
            <li>Movie Name: {genre.title} </li>
            <li>Movie Id: {genre.id}</li>
            <li> Votes: {genre.vote_average} and Vote count {genre.vote_count}</li>
            <button onClick={this.addToDo.bind(this)}> Add to do </button>
          </div>
        )
      })
    }
  }

  displayPlace(){
    let place = this.state.place
    if(place !== ""){
      return place.map((place,index) => {
        return(
          <div className="each-place" key={index}>
            <div>
              <img className="place-image "src={place.icon} alt={place.name} />
            </div>
            <div>
              <p> {place.name}</p>
              <p>{place.formatted_address}</p>
              <button onClick={this.viewMore.bind(this)}> View More </button>
              <button> add to favorites </button>
            </div>
          </div>
        )
      })
    }
  }

  //  Add to firebase

  addToDo(){
    null
  }

  render()
  {
    const user = this.props.user

    return (
      <div>
        <header className="search-header">
          <h1> Your Favorite Movies and Dinner Locations</h1>
        </header>


        <div>
          <button className="sign-out-button" onClick={this.props.logOut.bind(this)}> Sign Out </button>
          <img src={user.photoURL ? user.photoURL : null} className="userPhoto" alt="Profile"/>
          <h2> Your Favorite Movie is {user.movie} </h2>
          <p>Here are more movies based on your favorite Movie</p>
          <div>
            <p>His Movie</p>
            <input type="text" ref={(input) => {this.hisInput = input}}/>
            <p>Her Movie</p>
            <input type="text" ref={(input) => {this.herInput = input}}/>
          </div>
        </div>


        <div className="three-boxes">
          <div className="displaySearch movie-search">
            <form onSubmit={this.searchMovie.bind(this)}>
            <li>Look Up Movie by name</li>
              <input type="text" ref={ (input) => {this.input = input} }/>
              <button> Button </button>
              {this.displayMovies()}
            </form>
          </div>

          <div className="displaySearch genre-search">

            <div className="genre-div">
              <p className="genre-p"> Look Up Movie By Genre </p>
              <select onChange={this.searchGenre.bind(this)}className="genre-select">
                <option  className="genre-li Action hvr-grow"value="28"> Action</option>
                <option  className="genre-li Adventure hvr-grow"value="12"> Adventure</option>
                <option  className="genre-li Animation hvr-grow"value="16"> Animation</option>
                <option  className="genre-li Comedy hvr-grow"value="35"> Comedy</option>
                <option  className="genre-li Crime hvr-grow"value="80"> Crime</option>
                <option  className="genre-li Documentary hvr-grow"value="99"> Documentary</option>
                <option  className="genre-li Drama hvr-grow"value="18"> Drama</option>
                <option  className="genre-li Family hvr-grow"value="10751"> Family</option>
                <option  className="genre-li Fantasy hvr-grow"value="14"> Fantasy</option>
                <option  className="genre-li History hvr-grow"value="36"> History</option>
                <option  className="genre-li Horror hvr-grow"value="27"> Horror</option>
                <option  className="genre-li Music hvr-grow"value="10402"> Music</option>
                <option  className="genre-li Mystery hvr-grow "value="9648"> Mystery</option>
                <option  className="genre-li Romance hvr-grow "value="10749"> Romance</option>
                <option  className="genre-li Science hvr-grow "value="878"> Science</option>
                <option  className="genre-li Tv-Movie hvr-grow "value="10770"> Tv Movie</option>
                <option className="genre-li Thriller hvr-grow "value="53"> Thriller</option>
                <option  className="genre-li War hvr-grow "value="10752"> War</option>
              </select>
              {this.displayGenre()}
            </div>
          </div>


          <div className="displaySearch">
            <form onSubmit={this.searchPlaces.bind(this)}>
              <li>Look up Places</li>
              <input type="text" ref={ (input) => {this.dinners = input} }/>
              <button > Search </button>
              {this.displayPlace()}
            </form>
          </div>


        </div>
      </div>
    )
  }
}

export default UserAccount

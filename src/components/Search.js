import React, { Component } from 'react';
 import {Link } from 'react-router-dom'
import axios from 'axios'
import '../css/search.css'
import {base } from '../rebase';
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
      location:{},
      favMovies:[],
      alreadyWatched:[],
      favoriteLocations:[]
    }
  }

  componentDidMount () {
    let uid = this.props.match.params.uid
    console.log(this.props.match)
    axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAhoxu3waM5qMIQHwXGZ4Gcq7VuDcRohtU")
    .then(obj => {
      this.setState({
        location:obj.data.location
      })
    })

    base.fetch(`user/${uid}/favMovies`,{
      context:this,
      asArray:false,
      then(data){
        this.setState({
          favMovies: [data]
        })
        console.log(this.state.favMovies)
      }
    })

  }



  viewMore(index){
    if(index !== this.index){
      console.log(index)
      this.div.show()
    }
  }

  //  Add to firebase

  addToDo(movie){
    let uid = this.props.match.params.uid
    console.log(movie.title);
    base.update(`user/${uid}/wantToWatch`, {
      data: { movie: movie.title,
            released : movie.release_date,
            movieId: movie.id
      }
    })
  }

  addToFav(movie){
    let uid = this.props.match.params.uid
    console.log(movie.title);
    base.update(`user/${uid}/favMovies`, {
      data: { movie: movie.title,
            released : movie.release_date,
            movieId: movie.id
      }
    })
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
      return movies.splice(0,10).map((movie,index) => {
        return(
          <div className="each-movie" key={index}>
            <li> Movie Name: {movie.title} </li>
            <li>Movie Id: {movie.id}</li>
            <li>Released date: {movie.release_date}</li>
            <li> Votes: {movie.vote_average} and Vote count {movie.vote_count}</li>
            <button className="search-button" onClick={this.addToDo.bind(this, movie)}> Add to must watch </button>
            <button className="search-button" onClick={this.addToFav.bind(this , movie)}>  Favorites </button>
            <p><Link to={`https://www.themoviedb.org/search?language=en-US&query=${movie.title}`} target="_blank"> View More About Movie</Link></p>
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
          <div className="each-genre" key={index}>
            <li>Movie Name: {genre.title} </li>
            <li>Movie Id: {genre.id}</li>
            <li>Released date: {genre.release_date}</li>
            <li> Votes: {genre.vote_average} and Vote count {genre.vote_count}</li>
            <button className="search-button" onClick={this.addToDo.bind(this)}> Add to do </button>
            <button className="search-button" onClick={this.addToFav.bind(this , genre)}>  Favorites </button>
            <p><Link to={`https://www.themoviedb.org/search?language=en-US&query=${genre.title}`} target="_blank"> View More About Movie</Link></p>
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
              <button className="search-button" onClick={this.viewMore.bind(this)}> View More </button>
              <button className="search-button"> add to favorites </button>
            </div>
          </div>
        )
      })
    }
  }



  render()
  {
    const user = this.props.user
    const fav =  this.state.favMovies

    return (
      <div>
        <header className="search-header">
          <h1> Your Favorite Movies and Dinner Locations</h1>
        </header>


        <div className='under-header-div'>
          <div className="image-div">
            <h2>{user.firstName} {user.lastName}</h2>
            <img src={user.photoURL ? user.photoURL : null} className="userPhoto" alt="Profile"/>
            <h2> Your Favorite Movie is  </h2>
            <h3 className="h3-div">{user.movie}</h3>
          </div>

          <div className="favorite-movies">
            <h2> Some favorite Movies </h2>
            {fav.map((movies , index) => {
              return(
                <div key={index}>
                  <p>Name:{movies.movie}</p>
                </div>
              )
            })}
            {fav.movie}
          </div>
          <div className="favorite-locations">
            <h2> Favorite Locations </h2>
          </div>
        </div>


        <div className="three-boxes">
          <div className="displaySearch movie-search">
            <form onSubmit={this.searchMovie.bind(this)}>
            <li>Look Up Movie by name</li>
              <input type="text" ref={ (input) => {this.input = input} }/>
              <button className="search-button"> Button </button>
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
              <button className="search-button" > Search </button>
              {this.displayPlace()}
            </form>
          </div>


        </div>
      </div>
    )
  }
}

export default UserAccount

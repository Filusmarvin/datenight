import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
// import {base } from '../rebase';
import axios from 'axios'
import '../css/common.css';
const movieKey = "81599007ff214265c13a0888da791d0c";


class Common extends Component {
    constructor(){
      super()
      this.state = {
        users: {},
        user:{},
        herIds:[],
        hisIds:[],
        ourMovies:[]
      }
    }

    thereMovies(){
      const uid = this.props.match.params.uid
      const users = this.props.users
      if(this.props.users[uid]){
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${users[uid].movie}&total_results=1`)
        .then( obj => this.setState({
          myMovie:obj
        }))
      }
    }

    myMovies(){
      const uid = this.props.match.params.uid
      const users = this.props.users
      const user = this.props.user
      // const herIds = this.state.herIds
      // const hisIds = this.state.hisIds

      // if(this.props.users[uid]){
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${users[uid].movie}&total_results=10`)
        .then( obj =>  obj.data.results[0].genre_ids)
        .then( obj => this.setState({  herIds: obj }) )
        .then( axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${user.movie}&total_results=10`)
        .then(obj => obj.data.results[0].genre_ids)
        .then( obj => this.compareIds(obj) ))
    }

    myEvents(){

    }

    myLocations(){

    }

    compareIds(obj){
      const herIds = this.state.herIds
      const hisIds = obj
      // console.log(obj , this.state.herIds )
      for ( var i = 0; i < herIds.length; i++) {
        for (var  j = 0; j < hisIds.length; j++) {
          if (herIds[i] === hisIds[j]) {
            console.log(herIds[i])
            return axios.get(`https://api.themoviedb.org/3/genre/${herIds[i]}/movies?api_key=${movieKey}&sort_by=created_at.asc`).then(
              obj => this.setState({ ourMovies : obj.data.results}))
          }
        }
      }
      return axios.get(`https://api.themoviedb.org/3/genre/${herIds[0]}/movies?api_key=${movieKey}`).then(
        obj => this.setState({ ourMovies : obj.data.results})
      )
}



    renderMovies(){
      return this.state.ourMovies.slice(0 ,5).map((movie,index) => {
        return (
          <div className="movie-results" key={index}>
            <p> Movie Title: {movie.title} </p>
            <p> Movie Popularity: {movie.popularity}</p>
            <p> This was released {movie.release_date}</p>
            <Link to={`//www.google.com/#safe=strict&q=${movie.title}+movie+near+me`} target="_blank">
            <span className="movie-url hvr-grow" >Find movie near you </span> </Link>
          </div>

        )
      })
    }

    about(){
      const users = this.props.users
      const uid = this.props.match.params.uid
      // const user = this.props.user
      if(this.props.users[uid] && this.props.user.uid ){
        return(
          <div>
            <div className="sub-right">
              <p>{users[uid].displayName}</p>
              <img className="user-photo" src={users[uid].photoURL} alt="pic"/>
              <p> {users[uid].firstName}  {users[uid].lastName} </p>
                <div className="left-part">
                <p className="right-words"> Age <span> I am {users[uid].age} years old.</span> </p>
                <p className="right-words"> Restaraunt <span> I like to eat at {users[uid].restaraunt} </span> </p>
                <p className="right-words"> Movie <span> My favorite movie is { users[uid].movie }</span> </p>
                <p className="right-words"> Ethnicity <span> My ethnicity is {users[uid].ethnicity}</span> </p>
              </div>
            </div>
          </div>
        )
      } else {
      }
    }

  render(){
    const uid = this.props.match.params.uid
    const users = this.props.users
    const user = this.props.user
    console.log(uid, users[uid])
    return(
      <div className="common-container">
        <div className="myleft-side">
          <p> {user.displayName}</p>
          <img className="user-photo" src={user.photoURL} alt="pic"/>
          <p> {user.firstName}  {user.lastName} </p>
          <div className="right-part">
            <p className="left-words"> Age <span> I am {user.age} years old. </span> </p>
            <p className="left-words"> Restaraunt <span> I like to eat at {user.restaraunt}  </span> </p>
            <p className="left-words"> Movie <span> My favorite movie is { user.movie } </span> </p>
            <p className="left-words"> Ethnicity <span> My ethnicity is {user.ethnicity}  </span> </p>
          </div>
        </div>
        <div className="myright-side">
          {this.about()}
        </div>
        <div className="bottom-divs">
          <div className=" bottom-left">
          <button onClick={this.myMovies.bind(this)}> View more movies </button>
            {this.renderMovies()}
          </div>
          <div className="bottom-middle">
            <button onClick={this.myEvents.bind(this)}> View more events </button>
          </div>
          <div className=" bottom-right">
            <button onClick={this.myLocations.bind(this)}> View more locations </button>
          </div>

        </div>
      </div>
    )
  }
}

export default Common

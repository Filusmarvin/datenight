import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import {base } from '../rebase';
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
      const herIds = this.state.herIds
      const hisIds = this.state.hisIds

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
      if (herIds[i] == hisIds[j]) {
        console.log(herIds[i])
        return axios.get(`https://api.themoviedb.org/3/genre/${herIds[i]}/movies?api_key=${movieKey}&sort_by=created_at.asc`).then(
          obj => this.setState({ ourMovies : obj.data.results}))
      } else{
        return axios.get(`https://api.themoviedb.org/3/genre/${herIds[0]}/movies?api_key=${movieKey}`).then(
          obj => this.setState({ ourMovies : obj.data.results})
        )
      }
    }
  }
}



    renderMovies(){
      return this.state.ourMovies.slice(0 ,5).map((movie,index) => {
        return (
          <div key={index}>
          <img src={movie.backdrop_path} alt="Movies" />
            <p> Movie Title: {movie.title} </p>
            <p> Movie Popularity: {movie.popularity}</p>
            <p> This was released {movie.released_date}</p>
          </div>

        )
      })
    }

    about(){
      const users = this.props.users
      const uid = this.props.match.params.uid
      if(this.props.users[uid] && this.props.user.uid ){
        return(
          <div className="sub-right">
            <p>{users.displayName}</p>
            <img className="user-photo" src={users[uid].photoURL} alt="pic"/>
            <p> {users[uid].firstName}  {users[uid].lastName} </p>
            <p> {users[uid].email} </p>
            <div>
            <button onClick={this.thereMovies.bind(this)}> View more movies </button>
              Favorite Movie is {users[uid].movie}
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
    console.log(this.state.ourMovies)
    return(
      <div className="common-container">
        <div className="myleft-side">
          <p> {user.displayName}</p>
          <img className="user-photo" src={user.photoURL} alt="pic"/>
          <p> {user.firstName}  {user.lastName} </p>
          <p> {user.email} </p>
          <div>
            Favorite movie is {user.movie}
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

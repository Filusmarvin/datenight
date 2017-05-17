import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './hover.css';
import Login from './Login.js'
import Footer from  './Footer.js'

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Route exact path="/" component={Login} />
        < Footer />
      </div>
      </Router>
    );
  }
}

export default App;

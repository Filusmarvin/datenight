import React, { Component } from 'react';
import  { Link } from 'react-router-dom'

class Footer extends Component {
  render() {
    return (
      <div>
        <Link to="/"> About </Link>
        <Link to="/"> Home </Link>
        <Link to="/"> Terms and Conditions</Link>
      </div>
    );
  }
}

export default Footer;

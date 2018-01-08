import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import $ from "jquery";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Link to="/"> About </Link>
        <Link to="/"> Home </Link>
        <Link to="/"> Terms and Conditions</Link>
      </div>
    );
  }
}

export default Footer;

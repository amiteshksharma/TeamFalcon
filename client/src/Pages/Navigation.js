import React from "react";
import '../App.css';
import Image from 'react-bootstrap/Image'
import logo from "../logo.png"

const Navigation = (props) => (
  <div className="logo-div">
      <Image src={props.logo}/>
  </div>
  );

  export default Navigation;
import React from "react";
import { Navbar, Nav } from "../../node_modules/react-bootstrap";
import { ROUTES } from "../routes";
import "../bootstrap-scoped.scss";
import Image from 'react-bootstrap/Image'
import logo from "../logo.png"

const Navigation = () => (
  <div className="bootstrap-scoped">
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href={ROUTES.LANDING} className="brand-name" >
        <Image src={logo}/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  </div>
  );

  export default Navigation;
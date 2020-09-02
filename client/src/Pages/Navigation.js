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
<<<<<<< HEAD
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={ROUTES.INFO}>INFO</Nav.Link>
          <Nav.Link href={ROUTES.SYMPTOMS}>SYMPTOMS</Nav.Link>
          <Nav.Link href={ROUTES.PRELIMINARYDIAGNOSIS}>PRELIMINARY DIAGNOSIS</Nav.Link>
          <Nav.Link href={ROUTES.CLINICS}>CLINICS</Nav.Link>
          <Nav.Link href={ROUTES.CONFIRMATION}>Confirmation</Nav.Link>
        </Nav>
      </Navbar.Collapse>
=======
>>>>>>> 6dd183d0b565eee630b552e21576f0dec1123bf0
    </Navbar>
  </div>
  );

  export default Navigation;
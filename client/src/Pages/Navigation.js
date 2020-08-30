import React from "react";
import { Navbar, Nav } from "../../node_modules/react-bootstrap";
import { ROUTES } from "../routes";
import "../bootstrap-scoped.scss";

const Navigation = () => (
  <div className="bootstrap-scoped">
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href={ROUTES.LANDING} className="brand-name">
        TEAM FALCON
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={ROUTES.INFO}>INFO</Nav.Link>
          <Nav.Link href={ROUTES.SYMPTOMS}>SYMPTOMS</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
  );

  export default Navigation;
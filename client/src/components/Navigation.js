import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { ROUTES } from "../routes";
import { AuthUserContext } from "./session";

import SignOutButton from "./authentication/signout";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <div className="bootstrap-scoped">
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href={ROUTES.HOME} className="brand-name">
        Hacker News
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={ROUTES.STORIES}>Stories</Nav.Link>
          <Nav.Link href={ROUTES.CREATE}>Create Story</Nav.Link>
        </Nav>
        <Nav.Link className="sign_out" href={ROUTES.HOME}>
          <SignOutButton />
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

const NavigationNonAuth = () => (
  <div className="bootstrap-scoped">
    <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href={ROUTES.HOME} className="brand-name">
        Hacker News
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={ROUTES.STORIES}>Stories</Nav.Link>
        </Nav>
        <Nav.Link className="sign_in" href={ROUTES.LOGIN}>
          <Button variant="outline-info">
            <b>LogIn</b>
          </Button>
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Navigation;
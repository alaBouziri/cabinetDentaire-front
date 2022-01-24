import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavBarDoctor() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Mon cabinet</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Shopping cart */}
            <Nav className="ml-auto">
              <LinkContainer to="/admin/dashboard">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" /> Dashboard
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/list/patients">
                <Nav.Link>
                  <i className="fas fa-user" /> List patients
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/list/doctors">
                <Nav.Link>
                  <i className="fas fa-user" /> List doctors
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user" /> logout
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBarDoctor;

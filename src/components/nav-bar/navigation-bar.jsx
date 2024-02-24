import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Books App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Nav.Link as={Link} to="/mainview">Home</Nav.Link>
            
            {user ? (
              <>
                
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            ) : (
              <>
               
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
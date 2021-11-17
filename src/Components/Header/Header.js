import React from "react";
import { Container, Col, Navbar, Nav, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css"
function Header({ isEdit, setIsEdit }) {
  return (
    <Container>
      <Col>
        <Link to="/">
          <Navbar.Brand>Book Listing</Navbar.Brand>
        </Link>
        {isEdit ? <Badge bg="danger">Edit mode</Badge> : null}
      </Col>
      <Nav>
        <Nav.Link>
          <Link to="/new/book">New Book</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/new/author">New Author</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/new/category">New Category</Link>
        </Nav.Link>
        <Nav.Link>
          {isEdit ? (
            <button className="exit" onClick={() => setIsEdit(false)}>Exit Edit Mode</button>
          ) : (
            <button className="edit" onClick={() => setIsEdit(true)} > Edit Mode</button>
          )}
        </Nav.Link>
      </Nav>
    </Container>
  );
}

export default Header;

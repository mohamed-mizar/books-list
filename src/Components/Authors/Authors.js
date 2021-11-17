import React, { useEffect, useState } from "react";
import axios from "axios";
import Aux from "../../hoc/Auxi";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BooksList from "../Books/BooksList";

function Authors(props) {
  const { isEdit } = props;
  console.log(props.match.params.id);
  const [activeAuthor, setActiveAuthor] = useState([]);
  const id = props.match.params.id;
  useEffect(() => {
    const fech = async () => {
      const res = await axios.get(
        `https://books-json-server.herokuapp.com/authors/${id}`
      );
      console.log(res.data);
      setActiveAuthor(res.data);
    };
    fech();
  }, [id]);

  const [booksList, SetBooksList] = useState([]);

  useEffect(() => {
    const fechBooksList = async () => {
      const res = await axios.get(
        `https://books-json-server.herokuapp.com/books?author=${id}`
      );
      console.log(res.data);
      SetBooksList(res.data);
    };
    fechBooksList();
  }, [id]);
  
  let booksListAuthor;
  if(booksList) {
    booksListAuthor = booksList.map(bookDitails => {
      return (
        <BooksList bookDitails={bookDitails} isEdit={isEdit} />
      )
    })
  }

  return (
    <Aux>
      <Container>
        <Row>
          <Col>
            <h1>{activeAuthor.name} </h1>
          </Col>
          <Col>
            {isEdit && (
              <Link to={{ pathname: `/edit/author/${id}` }}>
                <Button>Edit</Button>
              </Link>
            )}
          </Col>
          <h6>{activeAuthor.jobTitle}</h6>
          <p>{activeAuthor.bio} </p>
        </Row>
        <Row>
          {booksListAuthor}
        </Row>
      </Container>
    </Aux>
  );
}
export default Authors;

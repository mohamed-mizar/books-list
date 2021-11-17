import React, { useState, useEffect } from "react";
import axios from "axios";
import Aux from "../../hoc/Auxi";
import { Container, Col, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import BooksList from "../Books/BooksList";

function Categories(props) {
  const { isEdit } = props;
  const [activeCategory, setActiveCategory] = useState([]);
  const id = props.match.params.id;
  useEffect(() => {
    const fechCategory = async () => {
      const res = await axios.get(
        `https://books-json-server.herokuapp.com/categories/${id}`
      );
      console.log(res.data);
      setActiveCategory(res.data);
    };
    fechCategory();
  }, [id]);

  const [booksList, SetBooksList] = useState([]);
  useEffect(() => {
    const fechBooksListForCategory = async () => {
      const res = await axios.get(
        `https://books-json-server.herokuapp.com/books?category=${id}`
      );

      SetBooksList(res.data);
    };
    fechBooksListForCategory();
  }, [id]);

  let booksListAuthor;
  if (booksList) {
    booksListAuthor = booksList.map((bookDitails) => {
      return <BooksList bookDitails={bookDitails} isEdit={isEdit} />;
    });
  }

  return (
    <Aux>
      <Container>
        <Row>
          <Col md={4}>
            <h3>{activeCategory.name} </h3>
          </Col>
          <Col >
            {isEdit && (
              <Link to={{ pathname: `/edit/category/${id}` }}>
                <Button>Edit</Button>
              </Link>
            )}
          </Col>
        </Row>
          
        
        <Row>{booksListAuthor}</Row>
      </Container>
    </Aux>
  );
}

export default Categories;

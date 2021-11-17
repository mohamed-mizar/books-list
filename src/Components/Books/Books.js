import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Col, Container, ListGroup, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Aux from "../../hoc/Auxi";

import "./Books.css";

function Books({ isEdit }) {
  const [books, setBooks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get(
        "https://books-json-server.herokuapp.com/books"
      );

      setBooks(res.data);
    };
    getBooks();
  }, []);

  const booksPerPage = 10;
  const pagesVisted = pageNumber * booksPerPage;

  const currentBooks = books.slice(pagesVisted, pagesVisted + booksPerPage);

  const pageCount = Math.ceil(books.length / booksPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Aux>
      {currentBooks.map((book) => {
        return (
          <Container key={book.id}>
            <Row>
              <Col sm={4} className="books_image">
                <img src={book.image} alt="" />
              </Col>
              <Col sm={8}>
                <ListGroup>
                  <Row>
                    <Col >
                      <h4>{book.title}</h4>
                    </Col>
                    <Col md="auto">
                      {isEdit && (
                        <Link to={{ pathname: `/edit/book/${book.id}` }}>
                          <Button>Edit</Button>
                        </Link>
                      )}
                    </Col>
                  </Row>
                </ListGroup>
                <ListGroup>
                  <p className="books_discription">{book.description}</p>
                </ListGroup>
              </Col>
              <hr />
            </Row>
          </Container>
        );
      })}
      <ReactPaginate
        previousLabel="<<"
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </Aux>
  );
}
export default Books;

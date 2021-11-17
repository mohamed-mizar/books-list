import React, { useState, useEffect } from "react";
import Aux from "../../../hoc/Auxi";
import { Form, Button, Col, Row, FloatingLabel } from "react-bootstrap";

import './NewBook.css'
import axios from "axios";

function NewBook() {


  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [pagesNumber, setPagesNumber] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [image, setImage] = useState('');

  const changeNameHandler = (e) => {
    setTitle(e.target.value)
  }
  const changeCategoryHandler = (e) => {
    console.log(e.target.value)
    setCategory(e.target.value)
  }
  const changeAuthorHandler = (e) => {
    console.log(e.target.value)
    setAuthor(e.target.value)
  }
  const changeDescriptionHandler = (e) => {
    setDescription(e.target.value)
  }

  const changeNumberOfPages = (e) => {
    setPagesNumber(e.target.value)
  }

  const changePublishYear = (e) => {
    setPublishYear(e.target.value)
  }

  const changeImage = (e) => {
    setImage(e.target.value)
  }

  const data = {
    title,
    description,
    category,
    author,
    pagesNumber,
    publishYear,
    image
  }
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('https://books-json-server.herokuapp.com/books', data)
      .then(res => {
        console.log(res)
      })
  }
  //show categories id in select
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fechCategory = async() =>{
      const res = await axios.get('https://books-json-server.herokuapp.com/categories')
      console.log(res.data)
      setCategories(res.data);
    }
    fechCategory()
  },[])

  //show authors id in select
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const fechAuthors = async() =>{
      const res = await axios.get('https://books-json-server.herokuapp.com/authors')
      console.log(res.data)
      setAuthors(res.data);
    }
    fechAuthors()
  },[])


  return (
    <Aux>
      <h3>Add New Book</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="" name="title" value={title} onChange={changeNameHandler} />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" onChange={changeCategoryHandler}>
                {categories.map(category => (
                  <option key={category.id} value={category.id}> {category.name} </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Select name="author"  onChange={changeAuthorHandler}>
                {authors.map(author => (
                  <option key={author.id } value={author.id}> {author.name} </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Label>Description</Form.Label>
        <FloatingLabel controlId="floatingTextarea2">
          <Form.Control as="textarea" style={{ height: "100px" }} name="description" vlaue={description} onChange={changeDescriptionHandler} />
        </FloatingLabel>
        <Form.Group className="mb-3">
          <Form.Label>ISBN</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Row>
          <Col>
          <Form.Group className="mb-3">
              <Form.Label>No. of Pages</Form.Label>
              <Form.Control type="number" placeholder=""name="pagesNumber" value={pagesNumber} onChange={changeNumberOfPages}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Year published</Form.Label>
              <Form.Control type="number" placeholder="2003" name="publishYear" value={publishYear} onChange={changePublishYear} />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="url" placeholder="" name="image" value={image} onChange={changeImage}/>
        </Form.Group>
        <Button className="save_bttn" variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="outline-dark">Cancel</Button>
      </Form>
    </Aux>
  );
}

export default NewBook;

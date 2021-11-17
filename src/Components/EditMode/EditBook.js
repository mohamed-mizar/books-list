import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxi";
import { Form, Button, Col, Row, FloatingLabel } from "react-bootstrap";

// import './NewBook.css'
import axios from "axios";

function EditBook(props) {


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
  const id = props.match.params.id;
  useEffect(() => {
    const getSingleBook = async () => {
      const res = await axios.get(
        `https://books-json-server.herokuapp.com/books/${id}`
      );
      setTitle(res.data.title);
      setCategory(res.data.category);
      setAuthor(res.data.author);
      setDescription(res.data.description);
      setPagesNumber(res.data.pagesNumber);
      setPublishYear(res.data.publishYear);
      setImage(res.data.image);
    };
    getSingleBook();
  }, [id]);

  const data = {
    "title":title,
    "description":description,
    "category":category,
    "author":author,
    "pagesNumber":pagesNumber,
    "publishYear":publishYear,
    "image":image
  }
  const submitHandler = (e) => {
    e.preventDefault();
    axios.put(`https://books-json-server.herokuapp.com/books/${id}`, data)
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
      <h3>Edit book : {title} </h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder=""  value={title} onChange={changeNameHandler} />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select onChange={changeCategoryHandler}>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Select name="author"  onChange={changeAuthorHandler}>
                {authors.map(auth => (
                  <option key={auth.id } value={auth.id}> {author} </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Label>Description</Form.Label>
        <FloatingLabel controlId="floatingTextarea2">
          <Form.Control as="textarea" style={{ height: "100px" }} name="description" value={description} onChange={changeDescriptionHandler} />
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

export default EditBook;

import React, { useState } from "react";
import Aux from "../../../hoc/Auxi";
import { Form, Button, FloatingLabel } from "react-bootstrap";

// import './NewAuthor.css'
import axios from "axios";

function NewAuthor() {


  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [bio, setBio] = useState('');


  const changeNameHandler = (e) => {
    setName(e.target.value)
  }

  const changeJobTitleHandler = (e) => {
    setJobTitle(e.target.value)
  }

  const changeBioHandler = (e) => {
    setBio(e.target.value)
  }

  const data = {
    name,
    jobTitle,
    bio
  }
  const submitAuthorHandler = (e) => {
    e.preventDefault();
    axios.post('https://books-json-server.herokuapp.com/authors', data)
      .then(res => {
        console.log(res)
      })
  }



  return (
    <Aux>
      <h3>Add New Author</h3>
      <Form onSubmit={submitAuthorHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="" name="name" vlaue={name} onChange={changeNameHandler} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Job title</Form.Label>
          <Form.Control type="text" placeholder="" name="jobTitle" vlaue={jobTitle} onChange={changeJobTitleHandler} />
        </Form.Group>

        <Form.Label>Bio</Form.Label>
        <FloatingLabel controlId="floatingTextarea2">
          <Form.Control as="textarea" style={{ height: "100px" }} name="bio" vlaue={bio} onChange={changeBioHandler} />
        </FloatingLabel>

        <Button className="save_bttn" variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="outline-dark">Cancel</Button>
      </Form>
    </Aux>
  );
}

export default NewAuthor;

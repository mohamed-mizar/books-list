import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxi"
import { Form, Button, FloatingLabel } from "react-bootstrap";

// import './NewAuthor.css'
import axios from "axios";

function EditAuthor(props) {


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
  const id = props.match.params.id;
  useEffect(() => {
    const fechSingleAuthor = async() => {
      const res = await axios.get(`https://books-json-server.herokuapp.com/authors/${id}`);
      console.log(res.data);
      setName(res.data.name)
      setJobTitle(res.data.jobTitle)
      setBio(res.data.bio)
    }
    fechSingleAuthor()
  },[id])

  const data = {
    "name" : name,
    "jobTitle": jobTitle,
    "bio" : bio
  }
  const submitAuthorHandler = (e) => {
    e.preventDefault();
    axios.put(`https://books-json-server.herokuapp.com/authors/${id}`, data)
      .then(res => {
        console.log(res)
      })
  }



  return (
    <Aux>
      <h3>Edit Author : {name} </h3>
      <Form onSubmit={submitAuthorHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="" value={name} onChange={changeNameHandler} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Job title</Form.Label>
          <Form.Control type="text" placeholder=""  value={jobTitle} onChange={changeJobTitleHandler} />
        </Form.Group>

        <Form.Label>Bio</Form.Label>
        <FloatingLabel controlId="floatingTextarea2">
          <Form.Control as="textarea" style={{ height: "100px" }} name="bio" value={bio} onChange={changeBioHandler} />
        </FloatingLabel>

        <Button className="save_bttn" variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="outline-dark">Cancel</Button>
      </Form>
    </Aux>
  );
}

export default EditAuthor;

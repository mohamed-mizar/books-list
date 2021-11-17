import React, { useState } from "react";
import Aux from "../../../hoc/Auxi";
import { Form, Button } from "react-bootstrap";

// import './NewCategory.css'
import axios from "axios";

function NewCategory() {

  const [name, setName] = useState('');

  const changeNameHandler = (e) => {
    setName(e.target.value)
  }

  const submitCategoryHandler = (e) => {
    e.preventDefault();
    axios.post('https://books-json-server.herokuapp.com/categories', name)
      .then(res => {
        console.log(res)
      })
  }



  return (
    <Aux>
      <h3>Add New Category</h3>
      <Form onSubmit={submitCategoryHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="" name="name" vlaue={name} onChange={changeNameHandler} />
        </Form.Group>

        <Button className="save_bttn" variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="outline-dark">Cancel</Button>
      </Form>
    </Aux>
  );
}

export default NewCategory;

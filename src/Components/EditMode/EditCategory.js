import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxi"
import { Form, Button } from "react-bootstrap";

// import './NewCategory.css'
import axios from "axios";

function EditCategory(props) {

  const [name, setName] = useState('');

  
  const id = props.match.params.id
  console.log('edit category id', id)

  useEffect(() => {
    const fechEditCategory = async() => {
      const res = await axios.get(`https://books-json-server.herokuapp.com/categories/${id}`);
      console.log('from getEditCategory',res.data);
      setName(res.data.name)
    }
    fechEditCategory()
  },[id])



  const changeNameHandler = (e) => {
    setName(e.target.value)
  }
  const data = {
    "name" : name
  }
  const submitCategoryHandler = (e) => {
    e.preventDefault();
    axios.put(`https://books-json-server.herokuapp.com/categories/${id}`, data)
      .then(res => {
        console.log(res)
      })
  }



  return (
    <Aux>
      <h3>Edit Category : {name} </h3>
      <Form onSubmit={submitCategoryHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="" value={name} onChange={changeNameHandler} />
        </Form.Group>

        <Button className="save_bttn" variant="primary" type="submit">
          Save Category
        </Button>
        <Button variant="outline-dark">Cancel</Button>
      </Form>
    </Aux>
  );
}

export default EditCategory;
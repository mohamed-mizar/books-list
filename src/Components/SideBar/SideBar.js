import React, {useState,useEffect} from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import { ListGroup, Row} from "react-bootstrap";
import Aux from "../../hoc/Auxi";


function SideBar() {

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const getBooks = async() =>{
      const res = await axios.get('https://books-json-server.herokuapp.com/categories')
      console.log(res.data)
      setCategories(res.data);
    }
    getBooks()
  },[])

  let categoryName;
  if(categories) {
    categoryName = categories.map(categ => {
      return(
        
        <ListGroup.Item as="li" key={categ.id}>
          <Link to={{
            pathname:`/category/${categ.id}`,
            }}>{categ.name}</Link>
        </ListGroup.Item>
      )
    })
  }


  useEffect(() => {
    const getAuthors = async() =>{
      const res = await axios.get('https://books-json-server.herokuapp.com/authors')
      console.log(res.data)
      setAuthors(res.data);
    }
    getAuthors()
  },[])
  
  let authorName;
  if(authors) {
    authorName = authors.map(author => {
      return(
        <ListGroup.Item as="li" key={author.id}>
          <Link to={{
            pathname:`/authors/${author.id}`,
            }}>{author.name}</Link>
        </ListGroup.Item>
        
      )
    })
  }

  return (
    <Aux>
      <Row>
      <ListGroup as="ul" >
          <ListGroup.Item as="li" active>
            Categories
          </ListGroup.Item>
          {categoryName}
        </ListGroup>
      </Row>
      <Row>
        <ListGroup as="ul">
          <ListGroup.Item as="li" active>
            Authors
          </ListGroup.Item>
            {authorName}
        </ListGroup>
      </Row>
    </Aux>
  );
}

export default SideBar;

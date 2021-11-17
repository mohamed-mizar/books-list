import React from "react";
import Aux from "../../hoc/Auxi";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import "./Layout.css";

function Layout(props) {
  const {isEdit,setIsEdit}=props;
  return (
    <Aux>
      <Navbar bg="dark" variant="dark">
        <Header isEdit={isEdit} setIsEdit={setIsEdit}/>
      </Navbar>
      <Container className="layout_section_tow">
        <Row>
          <Col sm={4}>
            <SideBar/>
          </Col>
          <Col sm={8}>
            {props.children}
          </Col>
        </Row>
      </Container>
    </Aux>
  );
}
export default Layout;

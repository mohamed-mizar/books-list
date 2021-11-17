import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

import Layout from "./Components/Layout/Layout";
import Router from "./Router";

function App() {
  const [isEdit, setIsEdit] = useState(false);
  console.log(isEdit);
  return (
    <BrowserRouter>
      <Layout isEdit={isEdit} setIsEdit={setIsEdit}>
        <Router isEdit={isEdit} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;

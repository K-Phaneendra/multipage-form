import React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Home from "../pages/home";
import Form from "../pages/form";

import "./style.css";

export default function LayoutContent() {
  return (
    <React.Fragment>
      <Container>
        <div className="layout-content">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </div>
      </Container>
    </React.Fragment>
  );
}

import React from "react";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import { MdOpenInNew } from "react-icons/md";

import "./style.css";

export default function Footer() {
  return (
    <React.Fragment>
      <div className="layout-footer">
        <Container>
          <div className="footer-content">
            Created by <Button variant="link" target="_blank" href="https://www.linkedin.com/in/phaneendra-kosanam-3b4756aa/">Phaneendra Kosanam <MdOpenInNew /></Button>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}

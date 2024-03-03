import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function CenteredForm(props) {
  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col xs="12" md="12" lg="2"></Col>
        <Col xs="12" md="12" lg="8">
          {props.children}
        </Col>
        <Col xs="12" md="12" lg="2"></Col>
      </Row>
    </React.Fragment>
  );
}

export function CenteredRow(props) {
  return (
    <React.Fragment>
      <Row>
        <Col xs="12" md="12" lg="12" className="justify-content-center d-flex">
          {props.children}
        </Col>
      </Row>
    </React.Fragment>
  );
}

import React, { Fragment } from "react";

import { Container, Image, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <h2>Bem-vindo ao SINIT!</h2>
      </div>
      <br></br>
      <div>
        <Image src={require("../images/teste_logoo.png")} fluid></Image>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Container>
          <Row>
            <Col xs={3} md={3}>
              <Link to="/register">
                <Button variant="secondary">Registo</Button>
              </Link>
            </Col>
            <Col></Col>
            <Col xs={3} md={3}>
              <Link to="/login">
                <Button variant="secondary">Login</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Home;

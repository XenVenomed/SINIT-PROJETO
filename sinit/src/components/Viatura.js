import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardColumns,
  Navbar,
  Container,
  Nav,
  Button,
} from "react-bootstrap";

import { base_address } from "../ipAddress";

const Viatura = () => {
  const [viaturas, setViaturas] = useState("");

  const [qtdViaturas, setQtdViaturas] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch(base_address + ":8000/sinit/info", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();

      const nif = parseData.nif;

      const body = { nif };

      const resp = await fetch(base_address + ":8000/sinit/viatura/nif", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parse = await resp.json();
      setViaturas(parse);
      setQtdViaturas(parse.length);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const cardInfo = (viaturas) => {
    let aux = [];
    let cards = [];
    for (let i = 0; i < qtdViaturas; i++) {
      aux.title = "Matricula: " + viaturas[i].matricula;
      aux.text =
        "Marca: " +
        viaturas[i].marca +
        " \n Cor: " +
        viaturas[i].cor +
        " \n Classe: " +
        viaturas[i].classe;

      cards.push(aux);
      aux = [];
      console.log(aux);
    }
    return cards;
  };

  const renderCard = (card, index) => {
    return (
      <Fragment>
        <Card style={{ width: "18rem" }} key={index} border="danger">
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.text}</Card.Text>
          </Card.Body>
        </Card>
        <p></p>
      </Fragment>
    );
  };

  return (
    <>
      <Navbar sticky="top" bg="light" variant="light" className="navbar">
        <Container>
          <Navbar.Brand href="/dashboard">
            <img
              alt=""
              src={require("../images/SINIT_LOGO.png")}
              width="80"
              height="60"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/perfil">Perfil</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: "50px 0",
        }}
      >
        <CardColumns>{cardInfo(viaturas).map(renderCard)}</CardColumns>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: "50px 0",
        }}
      >
        <Button variant="secondary" href="/viatura/nif">
          Adicionar Viatura
        </Button>
      </div>
    </>
  );
};

export default Viatura;

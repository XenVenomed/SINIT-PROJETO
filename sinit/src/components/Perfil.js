import React, { useEffect, useState } from "react";
import { Card, Navbar, Container, Nav, Button } from "react-bootstrap";

import { base_address } from "../ipAddress";

const Perfil = ({ setAuth }) => {
  const [perfil, setPerfil] = useState("");
  const [carta, setCarta] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch(base_address + ":8000/sinit/info", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();

      const nif = parseData.nif;

      const body = { nif };

      const resp = await fetch(base_address + ":8000/sinit/carta/cidadao", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parse = await resp.json();

      setPerfil(parseData);
      setCarta(parse);
      //setQtdViaturas(parse.length)
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkCarta = (carta) => {
    console.log(carta);
    if (carta !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

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
            <Nav.Link href="/viatura">Viaturas</Nav.Link>
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
        <Card border="danger" className="text-center">
          <Card.Header>Informação pessoal</Card.Header>
          <Card.Body>
            <Card.Title>{perfil.nome}</Card.Title>
            <Card.Text>
              <div>NIF: {perfil.nif}</div>
              <div>E-mail: {perfil.email}</div>
              <div>Telemovel: {perfil.telefone}</div>
              <div>Morada: {perfil.morada}</div>
              <div>
                Numero de Carta de Conducao: {carta.numerocartaconducao}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: "50px 0",
        }}
      >
        <Button
          variant="secondary"
          href="/cidadao/carta"
          disabled={checkCarta(carta.numerocartaconducao)}
        >
          Adicionar Carta de Condução
        </Button>
      </div>
    </>
  );
};

export default Perfil;

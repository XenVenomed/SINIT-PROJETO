import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardColumns,
  Navbar,
  Container,
  Nav,
  Button,
  Modal,
  Image,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { base_address } from "../ipAddress";
import "./navbar.css";

const Dashboard = ({ setAuth, setEventoId }) => {
  const [evento, setEvento] = useState("");
  const [pagamento, setPagamento] = useState("");

  const [qtdEventos, setQtdEventos] = useState("");
  const [qtdPagamento, setQtdPagamento] = useState("");

  const [show, setShow] = useState(false);
  const [eventToShow, setEventToShow] = useState("");

  const showOneEvent = (event) => setEventToShow(event);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getProfile = async () => {
    try {
      const res = await fetch(base_address + ":8000/sinit/info", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();

      const nif = parseData.nif;

      const body = { nif };

      const resp = await fetch(base_address + ":8000/sinit/eventos/nif", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parse = await resp.json();

      const response = await fetch(base_address + ":8000/sinit/pagamentos", {
        method: "GET",
      });

      const parseResponse = await response.json();

      setEvento(parse);
      setQtdEventos(parse.length);
      setPagamento(parseResponse);
      setQtdPagamento(parseResponse.length);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const cardInfo = (evento, pagamento) => {
    let aux = [];

    let cards = [];

    for (let i = 0; i < qtdEventos; i++) {
      //console.log(evento[i])
      aux.image = "https://www.circulaseguro.pt/inc/uploads/2017/06/foto.jpg";
      aux.title = "Infração com Id nº" + evento[i].eventoid;
      aux.text = "Matricula: " + evento[i].matricula;
      aux.eventoid = evento[i].eventoid;
      aux.velocidade = evento[i].velocidade;
      aux.data = evento[i].data.slice(0, 10);
      aux.matricula = evento[i].matricula;
      aux.localidade = evento[i].localidade;
      aux.coima = evento[i].coima;

      for (let j = 0; j < qtdPagamento; j++) {
        if (pagamento[j].eventoid === evento[i].eventoid) {
          aux.referencia = pagamento[j].referencia;
          aux.entidade = pagamento[j].entidade;
          aux.preco = pagamento[j].preco;
          break;
        } else {
          aux.referencia = "Não disponivel";
          aux.entidade = "Não Disponivel";
          aux.preco = "Não Disponivel";
        }
      }

      if (evento[i].pago === true) {
        aux.color = "success";
      } else {
        aux.color = "danger";
      }

      cards.push(aux);
      aux = [];
      //console.log(aux)
    }
    return cards;
  };

  const InfoEvent = (card) => {
    //let pagamentoo = Object.keys(card.pagamento)
    //aux.referencia=JSON.stringify(card.pagamento)
    //console.log(card)
    return (
      <>
        <Fragment>
          <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Infração com Id nº{card.eventoid}</Modal.Title>
            </Modal.Header>
            <Modal.Body center="true">
              <Image src={card.image} fluid />
              <div style={{ justifyContent: "center", alignItems: "center" }}>
                <b>Velocidade: </b> {card.velocidade}km/h
              </div>
              <div style={{ justifyContent: "center", alignItems: "center" }}>
                <b>Localidade: </b>
                {card.localidade}
              </div>
              <div style={{ justifyContent: "center", alignItems: "center" }}>
                <b>Data: </b>
                {card.data}
              </div>
              <div style={{ justifyContent: "center", alignItems: "center" }}>
                <b>Coima: </b>
                {card.coima}€
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Sair
              </Button>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={
                  <Popover id="popover-basic">
                    <Popover.Title as="h3">Referencia Multibanco</Popover.Title>
                    <Popover.Content>
                      <div>Entidade: {card.entidade}</div>
                      <div>Referencia: {card.referencia} </div>
                      <div>Preço: {card.preco} </div>
                    </Popover.Content>
                  </Popover>
                }
              >
                <Button variant="primary">Pagamento</Button>
              </OverlayTrigger>
              <Button variant="secondary" href="/evento/condutor">
                Não sou o condutor.
              </Button>
            </Modal.Footer>
          </Modal>
        </Fragment>
      </>
    );
  };
  const auxFunction = async (id) => {
    handleShow();
    showOneEvent(id);
  };

  const renderCard = (card, index) => {
    return (
      <>
        <Fragment>
          <Card
            style={{ width: "18rem" }}
            key={index}
            bg={card.color}
            text={card.color === "light" ? "dark" : "white"}
          >
            <Card.Img variant="top" src={card.image} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.text}</Card.Text>
              <Button variant="outline-light" onClick={() => auxFunction(card)}>
                Mais Informação
              </Button>
            </Card.Body>
          </Card>
          <p></p>
        </Fragment>
      </>
    );
  };

  const checkEvents = (qtd) => {
    if (qtd === 0) {
      return (
        <>
          <div>
            <h2>Não tem eventos de transito associados!</h2>
          </div>
          <div>
            <h4>Continua e boa condução!</h4>
          </div>
        </>
      );
    } else {
      return (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            padding: "50px 0",
          }}
        >
          <CardColumns>
            {cardInfo(evento, pagamento).map(renderCard)}
          </CardColumns>
          <div>{InfoEvent(eventToShow)}</div>
        </div>
      );
    }
  };

  return (
    <>
      <Navbar sticky="top" bg="light" variant="light" className="navbar">
        <Container>
          <Navbar.Brand href="/dashboard">
            <img
              alt=""
              src={require("../images/teste_logoo.png")}
              width="80"
              height="60"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/perfil">Perfil</Nav.Link>
            <Nav.Link href="/viatura">Viaturas</Nav.Link>
            <Nav.Link onClick={(e) => logout(e)}>Log Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {checkEvents(qtdEventos)}
    </>
  );
};

export default Dashboard;

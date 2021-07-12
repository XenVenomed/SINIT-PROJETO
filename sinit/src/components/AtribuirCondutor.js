import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { base_address } from "../ipAddress";

const Condutor = ({ setGoBack }) => {
  const [inputs, setInputs] = useState({});

  const { niftoupdate, eventoid, numerocartaconducao, nome } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(base_address + ":8000/sinit/info", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);

      const nif = parseData.nif;

      const body = { nif, niftoupdate, eventoid, numerocartaconducao, nome };
      console.log(body);
      const resp = await fetch(base_address + ":8000/sinit/carta/evento", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await resp.json();
      console.log(parseRes);
      if (parseRes) {
        setGoBack(true);
        toast.success("Evento Atualizado!");
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Form onSubmit={onSubmitForm}>
        <Form.Label className="text-center" style={{ width: "100%" }}>
          <h3 className="mt-5">Indicar o condutor de um Evento</h3>
        </Form.Label>
        <Form.Group className="mb-3">
          <Form.Label>NIF do Condutor</Form.Label>
          <Form.Control
            required
            type="text"
            name="niftoupdate"
            defaultValue={niftoupdate}
            placeholder="NIF do Condutor"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Identificador do Evento</Form.Label>
          <Form.Control
            required
            type="text"
            name="eventoid"
            defaultValue={eventoid}
            placeholder="Identificador do Evento"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Número da Carta de Condução</Form.Label>
          <Form.Control
            required
            type="text"
            name="numerocartaconducao"
            defaultValue={numerocartaconducao}
            placeholder="Número da Carta de Condução"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nome do Condutor</Form.Label>
          <Form.Control
            required
            type="text"
            name="nome"
            defaultValue={nome}
            placeholder="Nome do Condutor"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </Form.Group>

        <Button variant="success" type="submit" block={true}>
          Submit
        </Button>
      </Form>

      <Link to="/dashboard">Voltar atrás</Link>
    </Fragment>
  );
};

export default Condutor;

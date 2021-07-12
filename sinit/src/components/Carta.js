import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { base_address } from "../ipAddress";

const Carta = ({ setGoBack }) => {
  const [inputs, setInputs] = useState({});

  const { numerocartaconducao, validade, classeveiculo } = inputs;

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

      const nif = parseData.nif;

      const body = { numerocartaconducao, validade, classeveiculo, nif };

      const resp = await fetch(base_address + ":8000/sinit/carta", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await resp.json();
      if (parseRes) {
        setGoBack(true);
        toast.success("Carta de Condução Adicionada!");
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
          <h3 className="mt-5">Adicionar Carta de Condução</h3>
        </Form.Label>
        <Form.Group className="mb-3">
          <Form.Label>Número de Carta de Condução</Form.Label>
          <Form.Control
            required
            type="text"
            name="numerocartaconducao"
            defaultValue={numerocartaconducao}
            placeholder="Numero de Carta de Condução"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Validade</Form.Label>
          <Form.Control
            required
            type="text"
            name="validade"
            defaultValue={validade}
            placeholder="Validade"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Classe de Veiculo</Form.Label>
          <Form.Control
            required
            type="text"
            name="classeveiculo"
            defaultValue={classeveiculo}
            placeholder="Classe de Veiculo"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </Form.Group>

        <Button variant="success" type="submit" block={true}>
          Submit
        </Button>
      </Form>

      <Link to="/viatura">Voltar atrás</Link>
    </Fragment>
  );
};
export default Carta;

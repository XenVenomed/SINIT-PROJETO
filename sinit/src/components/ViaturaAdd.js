import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { base_address } from "../ipAddress";

const ViaturaAdd = ({ setGoBack }) => {
  const [inputs, setInputs] = useState({});

  const { matricula, marca, cor, classe } = inputs;

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

      const body = { matricula, marca, cor, classe, nif };

      const resp = await fetch(base_address + ":8000/sinit/viatura", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await resp.json();
      if (parseRes) {
        setGoBack(true);
        toast.success("Viatura Adicionada!");
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
          <h3 className="mt-5">Adicionar uma Viatura</h3>
        </Form.Label>
        <Form.Group className="mb-3">
          <Form.Label>Matricula</Form.Label>
          <Form.Control
            required
            type="text"
            name="matricula"
            defaultValue={matricula}
            placeholder="Matricula"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
          <Form.Text className="text-muted">Formato: xx-xx-xx</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Marca</Form.Label>
          <Form.Control
            required
            type="text"
            name="marca"
            defaultValue={marca}
            placeholder="Marca"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cor</Form.Label>
          <Form.Control
            required
            type="text"
            name="cor"
            defaultValue={cor}
            placeholder="Marca"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Classe</Form.Label>
          <Form.Control
            required
            type="text"
            name="classe"
            defaultValue={classe}
            placeholder="Marca"
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

export default ViaturaAdd;

import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { base_address } from "../ipAddress";
const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, nome, nif, morada, nomeutilizador, telefone } =
    inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        nif,
        nome,
        morada,
        password,
        nomeutilizador,
        email,
        telefone,
      };
      const response = await fetch(base_address + ":8000/sinit/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          required
          type="text"
          name="nif"
          value={nif}
          placeholder="NIF"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          required
          type="text"
          name="nome"
          value={nome}
          placeholder="Nome"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          required
          type="text"
          name="morada"
          value={morada}
          placeholder="Morada"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          required
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          required
          type="text"
          name="nomeutilizador"
          value={nomeutilizador}
          placeholder="Nome de utilizador"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          required
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          required
          type="text"
          name="telefone"
          value={telefone}
          placeholder="Telefone"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />

        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </Fragment>
  );
};

export default Register;

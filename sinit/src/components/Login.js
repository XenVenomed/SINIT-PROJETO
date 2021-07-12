import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { base_address } from "../ipAddress";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { nomeutilizador, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { nomeutilizador, password };
      const response = await fetch(base_address + ":8000/sinit/login", {
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
        toast.success("Logged in Successfully");
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
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm} cursor="pointer">
        <input
          required
          type="text"
          name="nomeutilizador"
          defaultValue={nomeutilizador}
          placeholder="Nome de utilizador"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          required
          type="password"
          name="password"
          defaultValue={password}
          placeholder="Password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block" type="submit">
          Submit
        </button>
      </form>
      <Link to="/register">Register</Link>
    </Fragment>
  );
};

export default Login;

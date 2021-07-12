import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { base_address } from "../ipAddress";

const EventoInfo = ({ setEventoId }) => {
  const [eventoInfo, setEventoInfo] = useState("");

  //const [qtdEventos, setQtdEventos] = useState("");

  const getProfile = async () => {
    try {
      /*
        const res = await fetch(base_address+":8000/sinit/info", {
          method: "GET",
          headers: { jwt_token: localStorage.token }
        });
  
        const parseData = await res.json();
       
        
        const nif = parseData.nif
       
        const body = {nif}*/

      const body = { setEventoId };
      console.log(setEventoId);
      const resp = await fetch(base_address + ":8000/sinit/eventos/info", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parse = await resp.json();
      //const data = parse.body.json();

      //console.log(parse)
      setEventoInfo(parse);
      //setQtdEventos(parse.length)
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");

      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };
  /*
    const viaturas = async e => {
      e.preventDefault();
      try {
        //localStorage.removeItem("token");
        setAuth(true);
        //toast.success("Logout successfully");
      } catch (err) {
        console.error(err.message);
      }
    };*/

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: "50px 0",
        }}
      >
        <h1 alignItems="center">{eventoInfo}</h1>
      </div>
    </>
  );
};

export default EventoInfo;

const useFetch = require("../config/useFetch");
const db = require("../config/database");

module.exports = {
  SigetMatch: function (NIF, matricula, EventoId) {
    const eventosSIGET = await useFetch.getEvents();

    eventosSIGET.array.forEach((element) => {
      if (element["matricula"].toUpperCase() === matricula.toUpperCase()) {
        const { rows } = await db.query(
          "INSERT INTO sinit.EVENTO (Velocidade, Data, Matricula, Localidade, Coima, Pago, NifProprietario ) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [
            element["velocidade"],
            element["data"],
            element["matricula"],
            element["localidade"],
            element["coima"],
            element["pago"],
            NIF,
          ]
        );
      }
    });
  },
};

const db = require("../config/database");

const useFetch = require("../config/useFetch");
// ==> Método responsável por criar um novo Evento:

// ==> Método responsável por listar todos os 'Products':
exports.getAllEvents = async (req, res) => {
  try {
    let eventToAdd = [];
    let aux = [];
    const response = await useFetch.getEvents();
    //console.log(response)

    for (let i = 0; i < response.length; i++) {
      //console.log(response[i])
      //console.log(response[i].eventoid)
      aux = await db.query(
        "SELECT * FROM sinit.EVENTO WHERE sinit.EVENTO.EventoId = $1",
        [response[i].eventoid]
      );
      //console.log(aux.rows[0].eventoid)

      //console.log(eventToAdd)
      if (!aux.rows.length <= 0) {
        //console.log("entrei"+eventToAdd)
        const sinitEvent = await db.query(
          "SELECT sinit.EVENTO.EventoId FROM sinit.EVENTO WHERE sinit.EVENTO.EventoId= $1 ",
          [aux.rows[0].eventoid]
        );
        //console.log(sinitEvent.rows)
        if (!aux.rows[0].eventoid === sinitEvent.rows[i]) {
          const { rows } = await db.query(
            "INSERT INTO sinit.EVENTO (Velocidade, EventoId, Data, Matricula, Localidade, Coima,Pago) VALUES ($1, $2, $3, $4, $5, $6,$7)",
            [
              response[i].velocidade,
              response[i].eventoid,
              response[i].data,
              response[i].matricula,
              response[i].localidade,
              response[i].coima,
              response[i].pago,
            ]
          );
        }
        let update = await db.query(
          "UPDATE sinit.EVENTO SET Pago = $1 WHERE sinit.EVENTO.EventoId = $2",
          [response[i].pago, aux.rows[0].eventoid]
        );
      }
      aux = [];
    }
    const allEvents = await db.query(
      "SELECT * FROM sinit.EVENTO ORDER BY sinit.EVENTO.EventoId ASC"
    );

    res.status(200).send(allEvents.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.EventsToCidadao = async (req, res) => {
  const { eventoid } = req.body;
  try {
    let getMatricula = await db.query(
      "SELECT sinit.EVENTO.Matricula FROM sinit.EVENTO WHERE sinit.EVENTO.EventoId =$1",
      [eventoid]
    );
    //console.log(getMatricula.rows[0].matricula)
    let getCidadao = await db.query(
      "SELECT sinit.CIDADAO_VIATURA.Nif FROM sinit.CIDADAO_VIATURA WHERE sinit.CIDADAO_VIATURA.Matricula =$1",
      [getMatricula.rows[0].matricula]
    );
    //console.log(getCidadao.rows[0].nif)
    let addEventoCidadao = await db.query(
      "INSERT INTO sinit.CIDADAO_EVENTO (NIF, EventoId) VALUES ($1, $2) RETURNING *",
      [getCidadao.rows[0].nif, eventoid]
    );

    res.status(200).send(addEventoCidadao.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getEventInfo = async (req, res) => {
  const { eventoid } = req.body;

  try {
    console.log(req.params.id);

    const evento = await db.query(
      "SELECT * FROM sinit.EVENTO WHERE sinit.EVENTO.EventoId = $1",
      [eventoid]
    );

    res.status(200).send(evento.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.EventsFromCidadao = async (req, res) => {
  const { nif } = req.body;

  try {
    let eventToAdd = [];
    let aux = [];
    let eventoid = "";
    const response = await useFetch.getEvents();
    //console.log(response)

    for (let i = 0; i < response.length; i++) {
      //console.log(response[i])
      //console.log(response[i].eventoid)
      aux = await db.query(
        "SELECT * FROM sinit.EVENTO WHERE sinit.EVENTO.EventoId = $1",
        [response[i].eventoid]
      );
      //console.log(aux.rows.length)

      //console.log(eventToAdd)
      if (aux.rows.length <= 0) {
        //console.log("entrei"+eventToAdd)
        //const sinitEvent = await db.query("SELECT sinit.EVENTO.EventoId FROM sinit.EVENTO WHERE sinit.EVENTO.EventoId= $1 ",[aux.rows[0].eventoid])
        //console.log(sinitEvent.rows)

        const { rows } = await db.query(
          "INSERT INTO sinit.EVENTO (Velocidade, EventoId, Data, Matricula, Localidade, Coima,Pago) VALUES ($1, $2, $3, $4, $5, $6,$7)",
          [
            response[i].velocidade,
            response[i].eventoid,
            response[i].data,
            response[i].matricula,
            response[i].localidade,
            response[i].coima,
            response[i].pago,
          ]
        );
      } else {
        let update = await db.query(
          "UPDATE sinit.EVENTO SET Pago = $1 WHERE sinit.EVENTO.EventoId = $2",
          [response[i].pago, aux.rows[0].eventoid]
        );
      }
      aux = [];
    }

    const allEvents = await db.query(
      "SELECT * FROM sinit.EVENTO ORDER BY sinit.EVENTO.EventoId ASC"
    );

    //console.log("ANTES DO ENTRREII")
    let tabela = await db.query("SELECT * FROM sinit.CIDADAO_EVENTO");
    //console.log(tabela.rows)
    for (let j = 0; j < allEvents.rows.length; j++) {
      //console.log(eventoid)
      eventoid = allEvents.rows[j].eventoid;
      //console.log(eventoid)
      let getMatricula = await db.query(
        "SELECT sinit.EVENTO.Matricula FROM sinit.EVENTO WHERE sinit.EVENTO.EventoId =$1",
        [eventoid]
      );
      //console.log(getMatricula.rows[0].matricula)
      let getCidadao = await db.query(
        "SELECT sinit.CIDADAO_VIATURA.Nif FROM sinit.CIDADAO_VIATURA WHERE sinit.CIDADAO_VIATURA.Matricula =$1",
        [getMatricula.rows[0].matricula]
      );
      //console.log(getCidadao.rows[0].nif)

      if (tabela.rows.length === 0) {
        let addEventoCidadao = await db.query(
          "INSERT INTO sinit.CIDADAO_EVENTO (NIF, EventoId) VALUES ($1, $2) RETURNING *",
          [getCidadao.rows[0].nif, eventoid]
        );
      } else {
        let check = await db.query(
          "SELECT sinit.CIDADAO_EVENTO.EventoId FROM sinit.CIDADAO_EVENTO WHERE sinit.CIDADAO_EVENTO.EventoId=$1",
          [eventoid]
        );
        if (check.rows.length === 0) {
          addEventoCidadao = await db.query(
            "INSERT INTO sinit.CIDADAO_EVENTO (NIF, EventoId) VALUES ($1, $2) RETURNING *",
            [getCidadao.rows[0].nif, eventoid]
          );
        }
        check = "";
      }
    }
    eventoid = "";

    let eventsFromCidadao = await db.query(
      "SELECT * FROM sinit.EVENTO JOIN sinit.CIDADAO_EVENTO ON sinit.CIDADAO_EVENTO.EventoId = sinit.EVENTO.EventoID WHERE sinit.CIDADAO_EVENTO.NIF = $1",
      [nif]
    );

    res.status(200).send(eventsFromCidadao.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

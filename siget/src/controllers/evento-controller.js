const db = require("../config/database");

// ==> Método responsável por criar um novo Evento:

exports.createEvento = async (req, res) => {
  const { velocidade, data, matricula, localidade, coima, pago } = req.body;
  //teste
  const { rows } = await db.query(
    "INSERT INTO siget.EVENTO (Velocidade, Data, Matricula, Localidade, Coima, Pago) VALUES ($1, $2, $3, $4, $5, $6)",
    [velocidade, data, matricula, localidade, coima, pago]
  );

  res.status(201).send({
    message: "Evento de transito Registado!",
    body: {
      Evento: { velocidade, data, matricula, localidade, coima, pago },
    },
  });
};

// ==> Método responsável por listar todos os 'Products':
exports.listAllEventos = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM siget.EVENTO ORDER BY siget.EVENTO.EventoId ASC"
  );
  res.status(200).send(response.rows);
};

exports.payEvento = async (req, res) => {
  try {
    const { eventoid, pago } = req.body;
    console.log(eventoid, pago);
    const { rows } = await db.query(
      "UPDATE siget.EVENTO SET Pago = $1 WHERE siget.EVENTO.EventoId = $2",
      [pago, eventoid]
    );

    res.status(201).send({
      message: "Evento de transito Atualizado!",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

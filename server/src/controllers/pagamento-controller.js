const db = require("../config/database");

const useFetch = require("../config/useFetch");

exports.getAllPagamentos = async (req, res) => {
  try {
    let aux = [];
    const response = await useFetch.getPagamentos();

    for (let i = 0; i < response.length; i++) {
      aux = await db.query(
        "SELECT * FROM sinit.PAGAMENTO WHERE sinit.PAGAMENTO.EventoId = $1",
        [response[i].eventoid]
      );

      if (aux.rows.length <= 0) {
        const { rows } = await db.query(
          "INSERT INTO sinit.PAGAMENTO (Preco, Entidade, Referencia, EventoId) VALUES ($1, $2, $3, $4)",
          [
            response[i].preco,
            response[i].entidade,
            response[i].referencia,
            response[i].eventoid,
          ]
        );
      }
      aux = [];
    }

    const allEvents = await db.query(
      "SELECT * FROM sinit.PAGAMENTO ORDER BY sinit.PAGAMENTO.EventoId ASC"
    );

    res.status(200).send(allEvents.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getPagamentoOfEvento = async (req, res) => {
  const { eventoid } = req.body;

  try {
    const allEvents = await db.query(
      "SELECT * FROM sinit.PAGAMENTO WHERE sinit.PAGAMENTO.EventoId=$1",
      [eventoid]
    );

    res.status(200).send(allEvents.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

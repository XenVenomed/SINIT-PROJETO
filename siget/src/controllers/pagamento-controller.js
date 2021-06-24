const db = require("../config/database");

// ==> Método responsável por criar um novo Evento:

exports.createPagamento = async (req, res) => {
  const {preco, entidade, referencia,eventoid} = req.body;
  
  const { rows } = await db.query(
    "INSERT INTO siget.PAGAMENTO (Preco, Entidade, Referencia,EventoId) VALUES ($1, $2, $3, $4)",
    [preco, entidade, referencia, eventoid]
  );

  res.status(201).send({
    message: "Referencia Multibanco Registada!",
    body: {
      pagamento: {preco, entidade, referencia,eventoid}
    },
  });
};

// ==> Método responsável por listar todos os 'Products':
exports.listAllPagamentos = async (req, res) => {
  const response = await db.query('SELECT * FROM siget.PAGAMENTO ORDER BY siget.PAGAMENTO.Preco ASC');
  res.status(200).send(response.rows);
};
const { use } = require("../../../siget/src/app");
const db = require("../config/database");

const useFetch = require("../config/useFetch")
// ==> Método responsável por criar um novo Evento:

exports.createCidadao = async (req, res) => {

  //FALTA INTRODUÇÃOO DAS MATRICULAS E DA CARTA DE CONDUÇÃO A ASSOCIAR
  
  const { NIF, nome, morada, password, NomeUtilizador, Email,Telefone} = req.body;
  
  const { rows } = await db.query(
    "INSERT INTO sinit.CIDADAO (NIF, nome, morada, password, NomeUtilizador, Email,Telefone) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [NIF, nome, morada, password, NomeUtilizador, Email,Telefone]
  );

  res.status(201).send({
    message: "Cidadão Registado!",
    body: {
      cidadao: { NIF, nome, morada, password, NomeUtilizador, Email,Telefone }
    },
  });
};

// ==> Método responsável por listar todos os 'Products':
exports.listAllCidadao = async (req, res) => {
  const response = await db.query('SELECT * FROM sinit.CIDADAO ORDER BY sinit.CIDADAO.Nome ASC');
  res.status(200).send(response.rows);
};

// ==> Método responsável por listar todos os 'Products':
exports.listAllEvents = async (req, res) => {
  const response = await useFetch.getEvents();
  /*for(let i=0;i<response.rows.length;i++){
  const { rows } = await db.query(
    "INSERT INTO sinit.EVENTO (Velocidade, EventoId, Data, Matricula, Localidade, Coima) VALUES ($1, $2, $3, $4, $5, $6)",
    [response.rows[i].velocidade,response.rows[i].eventoid,response.rows[i].data,response.rows[i].matricula,response.rows[i].localidade,response.rows[i].coima])
  }*/
  res.status(200).send(response);
};
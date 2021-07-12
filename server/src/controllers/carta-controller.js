const db = require("../config/database");

exports.addCartaConducao = async (req, res) => {
  const { numerocartaconducao, validade, classeveiculo, nif } = req.body;

  try {
    const numCaryta = await db.query(
      "SELECT * FROM sinit.CARTA_DE_CONDUCAO WHERE sinit.CARTA_DE_CONDUCAO.NumeroCartaConducao = $1",
      [nif]
    );

    if (numCaryta.rows.length > 0) {
      return res.status(401).json("Carta de condução já registada!");
    }

    //TODO: Validação de password ; Enviar e-mail de confirmação - validação de conta
    let newCarta = await db.query(
      "INSERT INTO sinit.CARTA_DE_CONDUCAO (NumeroCartaConducao, Validade, ClasseVeiculo, NIF) VALUES ($1, $2, $3, $4) RETURNING *",
      [numerocartaconducao, validade, classeveiculo, nif]
    );

    return res.status(201).send({
      message: "Carta de Condução Registada!",
      body: {
        CartaConducao: { numerocartaconducao, validade, classeveiculo, nif },
      },
    });
    //res.status(200).send(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//é necessario fazer o update do nif na base de dados para atribuir dps ao user novo
exports.selectCartaConducao = async (req, res) => {
  const { nif } = req.body;
  console.log(nif);
  try {
    const numCaryta = await db.query(
      "SELECT * FROM sinit.CARTA_DE_CONDUCAO WHERE sinit.CARTA_DE_CONDUCAO.NIF = $1",
      [nif]
    );

    if (numCaryta.rows.length <= 0) {
      return res.status(401).json("Carta de condução não registada!");
    }

    return res.status(201).send(numCaryta.rows[0]);
    //res.status(200).send(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateCidadaoInfracao = async (req, res) => {
  const { nif, niftoupdate, eventoid, numerocartaconducao, nome } = req.body;
  console.log(nif);
  console.log(niftoupdate);
  console.log(eventoid);
  console.log(numerocartaconducao);
  console.log(nome);

  let eventoInfo = "";
  let eventoRevisao = "";
  let deleteEvento = "";
  let update = "";
  //console.log(nif)
  try {
    const cidadaoRegistado = await db.query(
      "SELECT * FROM sinit.CIDADAO WHERE sinit.CIDADAO.NIF = $1",
      [niftoupdate]
    );
    //vriar uma nova entidade no sigey de eventos ppor tratar
    if (cidadaoRegistado.rows.length <= 0) {
      console.log(eventoid);
      eventoInfo = await db.query(
        "SELECT * FROM sinit.EVENTO WHERE sinit.EVENTO.EventoId = $1",
        [eventoid]
      );

      eventoRevisao = await db.query(
        "INSERT INTO siget.EVENTO_POR_REVISAO (Velocidade,Data,Matricula,Localidade,Coima,EventoId,Pago,NifViatura,NifCondutor,NumeroCartaConducao,Nome) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11)",
        [
          eventoInfo.rows[0].velocidade,
          eventoInfo.rows[0].data,
          eventoInfo.rows[0].matricula,
          eventoInfo.rows[0].localidade,
          eventoInfo.rows[0].coima,
          eventoInfo.rows[0].eventoid,
          eventoInfo.rows[0].pago,
          nif,
          niftoupdate,
          numerocartaconducao,
          nome,
        ]
      );

      deleteEvento = await db.query(
        "DELETE FROM sinit.PAGAMENTO where sinit.PAGAMENTO.EventoId=$1",
        [eventoid]
      );
      deleteEvento = await db.query(
        "DELETE FROM sinit.CIDADAO_EVENTO where sinit.CIDADAO_EVENTO.EventoId=$1",
        [eventoid]
      );
      deleteEvento = await db.query(
        "DELETE FROM sinit.EVENTO where sinit.EVENTO.EventoId=$1",
        [eventoid]
      );

      deleteEvento = await db.query(
        "DELETE FROM siget.PAGAMENTO where siget.PAGAMENTO.EventoId=$1",
        [eventoid]
      );
      deleteEvento = await db.query(
        "DELETE FROM siget.EVENTO where siget.EVENTO.EventoId=$1",
        [eventoid]
      );

      console.log(eventoInfo.rows);
    } else {
      update = db.query(
        "UPDATE sinit.CIDADAO_EVENTO SET NIF = $1 WHERE sinit.CIDADAO_EVENTO.EventoId = $2",
        [niftoupdate, eventoid]
      );
    }

    return res.status(201).send({ message: "Evento Atualizado!" });
    //res.status(200).send(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

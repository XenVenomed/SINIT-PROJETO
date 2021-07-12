const db = require("../config/database");

exports.addViatura = async (req, res) => {
  const { matricula, marca, cor, classe, nif } = req.body;

  try {
    const matricula_p = await db.query(
      "SELECT * FROM sinit.VIATURA WHERE sinit.VIATURA.Matricula = $1",
      [matricula]
    );

    if (matricula_p.rows.length > 0) {
      return res.status(401).json("Viatura já registada!");
    }

    //TODO: Validação de password ; Enviar e-mail de confirmação - validação de conta
    let newViatura = await db.query(
      "INSERT INTO sinit.VIATURA (Matricula, Marca, Cor, Classe) VALUES ($1, $2, $3, $4) RETURNING *",
      [matricula, marca, cor, classe]
    );

    let newViaturaForCidadao = await db.query(
      "INSERT INTO sinit.CIDADAO_VIATURA (NIF, Matricula) VALUES ($1, $2) RETURNING *",
      [nif, matricula]
    );

    return res.status(201).send({
      message: "Carta de Condução Registada!",
      body: {
        Viatura: { matricula, marca, cor, classe },
      },
    });
    //res.status(200).send(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.ViaturaFromCidadão = async (req, res) => {
  const { nif } = req.body;
  console.log(req.body);
  try {
    let viaturas = await db.query(
      "SELECT * FROM sinit.VIATURA JOIN sinit.CIDADAO_VIATURA ON sinit.VIATURA.Matricula = sinit.CIDADAO_VIATURA.Matricula WHERE sinit.CIDADAO_VIATURA.NIF = $1",
      [nif]
    );

    res.status(200).send(viaturas.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

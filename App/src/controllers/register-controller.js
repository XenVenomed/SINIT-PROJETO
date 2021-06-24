const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwtGenerator = require('../utils/jwtGenerator');

exports.registerCidadao = async (req,res) =>{

    const { nif, nome, morada, password, nomeutilizador, email, telefone } = req.body;

  try {
    const user = await db.query("SELECT * FROM sinit.CIDADAO WHERE sinit.CIDADAO.NIF = $1", [
      nif
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //TODO: Validação de password ; Enviar e-mail de confirmação - validação de conta
    let newUser = await db.query(
      "INSERT INTO sinit.CIDADAO (NIF, Nome, Morada, Password, NomeUtilizador,Email,Telefone) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *",
      [nif, nome, morada, bcryptPassword, nomeutilizador, email, telefone]
    );
    
    const jwtToken = jwtGenerator(newUser.rows[0].nif);

    return res.json({ jwtToken });
    //res.status(200).send(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

}

exports.loginCidadao = async (req,res) => {
    const { nomeutilizador, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM sinit.CIDADAO WHERE sinit.CIDADAO.NomeUtilizador = $1", [
      nomeutilizador
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential password");
    }
    const jwtToken = jwtGenerator(user.rows[0].nif);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}
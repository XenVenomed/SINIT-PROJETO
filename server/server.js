/**
 * Arquivo responsável por toda a configuração e execução da aplicação.
 */

const app = require("./src/app");

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Aplicação executando na porta ", port);
});

//DATABASE_URL=postgres://{db_username}:{db_password}@{host}:{port}/{db_name}

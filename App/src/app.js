const express = require('express');
const cors = require('cors');

const app = express();

// ==> Rotas da API:
const index = require('./routes/index');
const cidadaoRoute = require('./routes/cidadao-routes');
const authRoute = require('./routes/auth-routes')
//const pagamentoRoute = require('./routes/pagamento-routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/sinit/', cidadaoRoute);
app.use('/sinit/', authRoute);
//app.use('/api/', pagamentoRoute);

module.exports = app;
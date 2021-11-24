const express = require('express');
const app = express();
const port = 443;
const cors = require('cors');
const router = require('./src/routes');

app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(port, () => {
  console.log(`CaseHelpSVP API executando na porta ${port}...`);
});
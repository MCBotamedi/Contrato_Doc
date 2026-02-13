require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path')
const app = express();
const routes = require('./routes')
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve('./public')))
app.use(routes);

app.listen(3000, () => { console.log('Servidor rodando na porta 3000') });

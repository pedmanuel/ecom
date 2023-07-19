const express = require("express");
const compression = require('compression');
const path = require('path');


const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

//para usar um ficheiro de sistema *filesytem
const {readdirSync} = require("fs");



require("dotenv").config();

// app
const app = express();


// base de dados
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("BASE DE DADOS LIGADA"))
  .catch((err) => console.log("ERRO AO CONECTAR BASE DE DADOS", err));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//rotas para o heroku
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//ler e sicnronizar as rotas
readdirSync("./routes").map((r)=>
 app.use("/api", require("./routes/" + r))
 );


// porta de ligacao do servidor
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`O servidor está ligado na porta ${port}`));

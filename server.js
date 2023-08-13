const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const { readdirSync } = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true, // Configuração atualizada para evitar a depreciação
    useUnifiedTopology: true,
  })
  .then(() => console.log("BASE DE DADOS LIGADA"))
  .catch((err) => console.log("ERRO AO CONECTAR BASE DE DADOS", err));

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// Rotas do middleware ler e sicnronizar as rotas
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`O servidor está ligado na porta ${port}`));

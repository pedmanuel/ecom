const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Importar rotas de autenticação
const authRoutes = require("./routes/auth");
const port = process.env.PORT || 3000;
const app = express();

// Base de dados
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true, // Adicionado para evitar um aviso de depreciação
  })
  .then(() => console.log("BASE DE DADOS LIGADA"))
  .catch((err) => console.log("ERRO AO CONECTAR BASE DE DADOS", err));

// Middlewares
app.use(compression());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// Rotas do middleware
app.use(express.static(path.join(__dirname, "build")));

// Rotas de autenticação
app.use("/api/auth", authRoutes);

// Configuração da rota principal (para fins de teste)
app.get("/", (req, res) => {
  res.send("Servidor Express funcionando corretamente!");
});

app.listen(port, () => console.log(`O servidor está ligado na porta ${port}`));





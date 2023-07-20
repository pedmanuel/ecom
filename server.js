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
    useFindAndModify: false, // Configuração atualizada para evitar a depreciação
    useUnifiedTopology: true,
  })
  .then(() => console.log("BASE DE DADOS LIGADA"))
  .catch((err) => console.log("ERRO AO CONECTAR BASE DE DADOS", err));

// Middlewares
app.use(compression());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// Rotas do middleware

//ler e sicnronizar as rotas
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.use(express.static(path.join(__dirname, "build")));

// Exemplo de uso do Mongoose para buscar documentos na coleção "ecom-expshoppbd"
const Documento = mongoose.model("Documento", new mongoose.Schema({})); // Substitua "Documento" pelo nome do modelo desejado

app.get("/buscar-documentos", async (req, res) => {
  try {
    const documentos = await Documento.find({});
    res.json(documentos);
  } catch (error) {
    console.error("Erro ao buscar documentos:", error);
    res.status(500).json({ error: "Erro ao buscar documentos" });
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`O servidor está ligado na porta ${port}`));

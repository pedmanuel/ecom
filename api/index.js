const express = require("express");
const app = express();

app.get("/api/saudacao", (req, res) => {
  res.json({ message: "Olá, mundo!" });
});

module.exports = app;
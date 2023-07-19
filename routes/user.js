const express = require('express');
const router = express.Router();

// rota do consumo da API
router.get("/user", (req, res) => {
    res.json({
      data: " voçê esta consumindo o USER do endpoint do API do e-com",
    });
  });


  module.exports = router;
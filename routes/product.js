const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, 
        listAll, 
        remove, 
        read,
        update,
        list,
        productsCount,
    } = require("../controllers/product");

// routes
router.post("/product", create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll); // produ
router.delete("/product/:slug", remove); 
router.get("/product/:slug", read);
router.put("/product/:slug", update);

 router.post ("/products", list);
 

module.exports = router;
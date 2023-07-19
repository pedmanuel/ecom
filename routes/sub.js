const express = require ('express');
const router = express.Router(); 

//middlewares
const {authCheck, adminCheck} = require("../middlewares/auth");


// controller
const { 
    create,
    read, 
    update,
    remove ,
    list
     } = require("../controllers/sub");

// routes
//router.post("/sub" , authCheck, adminCheck, create);
router.post("/sub",create);
router.get("/subs", list);
router.get("/sub/:slug", read);
router.put("/sub/:slug", update);
router.delete("/sub/:slug",remove);

module.exports= router;
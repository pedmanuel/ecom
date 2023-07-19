const express = require ('express');
const router = express.Router(); 

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");


//controllers
const { upload, remove} = require("../controllers/cloudinary")


router.post('/uploadimages', upload)
router.delete('/removeimages', remove)

module.exports = router;
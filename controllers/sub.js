const Sub = require("../models/sub");
const slugify = require("slugify");

//CRIAR  SUBCATEGORIA
exports.create = async (req, res) => {  
try {
    const {name, parent} = req.body;
    res.json( await new Sub({ name, parent, slug: slugify(name) }).save());     
    } catch (err){
        //console.log(err)
        res.send('CRIAR SUBCATEGORIAS FALHOU');
    }
};

//LISTAR SUBCATEGORIA
exports.list = async (req, res) => 
  res.json(await Sub.find({}).sort({ createdAt: -1}).exec());
  
  
//LER SUBCATEGORIAS
exports.read = async (req, res) => {
  let sub = await Sub.findOne({slug: req.params.slug}).exec();
      res.json(sub);
  };

//ACTUALIZAR SUBCATEGORIAS
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Create update failed");
  }
};





//ELIMINAR SUBCATEGORIAS
exports.remove = async (req, res) =>{  
    try{
        const deleted = await Sub.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    } catch (err){
        res.status(400).send("eliminar falhou");
    }
};


const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
    err:err.mesage,
  });
  }
};

/*

//LEITRURA DE PRODUTOS
exports.read = async (req, res) => {
  let products = await Product.find({});
  res.json(products);
};

*/


//LISTAR TODOS OS PRODUTOS
exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};
 
// REMOVER PRODUTOS
exports.remove = async (req, res) => {
  try{
    const deleted = await Product.findOneAndRemove({slug: req.params.slug}).exec();
    res.json(deleted);
  } catch (err){
    console.log(err)
    return res.status(400).send('ELIMINAR PRODUTO FALHOU')

  }

};


//OBTER PRODUTO PARA ACTUALIZAR
exports.read = async (req, res ) => {
  const product = await Product.findOne({ slug: req.params.slug})
  .populate('category')
  .populate("subs")
  .exec();
  res.json(product);
};

//ACTUALIZAR PRODUTO
exports.update = async (req, res ) => {
  try{
      if(req.body.title){
        req.body.slug = slugify(req.body.title);
      }
      const updated = await Product.findOneAndUpdate(
        {slug: req.params.slug}, 
        req.body,
        {new: true}
         ).exec();
         res.json(updated);
  }catch(err){
    console.log('ERRO AO ACTUALIZAR ---->', err);
    //return res.status(400).send('Actualizar produto falhou')
    res.status(400).json({
      err: err.messge,
    });
  }

};

/*

// LISTA DE PRODUTOS SEM PAGINAÇÃO 
exports.list = async (req, res) =>{
  try{
    const {sort, order, limit} = req.body
    const products = await Product.find({})
    .populate("category")
    .populate("subs")
    .sort([[sort, order]])
    .limit(limit)
    .exec();

res.json(products);
  } catch (err){
    console.log(err)
  }
};

*/

// LISTA DE PRODUTOS COM PAGINAÇÃO
exports.list = async (req, res) => {
  console.table(req.body);
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3; // 3

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

const Produit = require("../models/ProduitModel");
const Categorie = require("../models/CategorieModel");

exports.createProduit = async (req, res, next) => {
  const { name, prix, quantity,url,categorie } = req.body;
  const cat = await Categorie.findOne({ categorie });
  const produit = new Produit({
    name,
    prix,
    quantity,
    url,
    categories:cat,
  });
  console.log(produit)
  if (produit) {
    await produit.save();
    res.status(201).json({ produit });
  } else {
    res.status(403).json({ error: "Produit cannot be created" });
  }
};
exports.deleteProduit = async (req, res, next) => {
  const { _id } = req.params;
  const produit = await Produit.findById(_id);

  if (produit) {
    await produit.deleteOne({ _id });
    res.status(201).json({ msg: "produit supprimer" });
  } else {
    res.status(404).json({ msg: "produit not found" });
  }
};

exports.updateProduit = async (req, res, next) => {
  const { _id } = req.params; //requieri f id
  const { name, prix, quantity } = req.body.Produit;
  console.log(req.body)
  const produit = await Produit.findById(_id); // recherche par id
  if (produit) {
    //  existence produit
    const updateProduit = Produit.findOneAndUpdate({_id },{
      name,
      prix,
      quantity,
    }, { new: true },(err, contact) => {
      if (err) {
        console.log(err)
        res.status(400).json(err);
      }
    });
      
    if (updateProduit) {
      //   await updateProduit.save();
      res.status(201).json({ message: "produit a ete mise a jour" });
    } else {
      res.status(500).json({ message: "cannot update produit" });
    }
  } else {
    res.status(404).json({ message: "produit is not found" });
  }
};

// //récuperer des produit
exports.getAllProduit = async (req, res, next) => {
  const produits = await Produit.find();
  console.log(produits);
  if (produits) res.status(201).json({ produits });
  else res.status(404).json({ message: "produit not found" });
};
//récuperer des produit selon cette path
exports.getOneProduit = async (req, res, next) => {
  const { _id } = req.params;
  const produit = await Produit.findOne({ _id });
  if (produit) res.status(201).json({ produit });
  else res.status(404).json("not found");
};

exports.addProduitToCategorie = async (req, res, next) => {
  const { _id } = req.params; //requieri f id
  const { categorie_id } = req.body;
  const result = await Produit.findByIdAndUpdate(
    _id,
    { $push: { categories: categorie_id } },
    { new: true, useFindAndModify: false }
  );

  if (result) {
    res.status(201).json({ result });
  } else {
    res.status(403).json({ error: "Produit cannot be created" });
  }
};

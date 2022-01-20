const Commande = require("../models/CommandeModel");

exports.createCommande = async (req, res, next) => {
  const { prix, quantity } = req.body;

  const commande = new Commande({
    prix,
    quantity,
  });
  if (commande) {
    await commande.save();
    res.status(201).json({ commande });
  } else {
    res.status(403).json({ error: "Commande cannot be created" });
  }
};
exports.deleteCommande = async (req, res, next) => {
  const { _id } = req.params;
  const commande = await Commande.findById(_id);

  if (commande) {
    await commande.deleteOne({ _id });
    res.status(201).json({ msg: "commande supprimer" });
  } else {
    res.status(404).json({ msg: "commande not found" });
  }
};

exports.updateCommande = async (req, res, next) => {
  const { _id } = req.params; //requieri f id
  const { prix, quantity } = req.body;
  const commande = await Commande.findById(_id); // recherche par id
  if (commande) {
    //  existence commande
    const updateCommande = await Commande.updateOne({
      prix,
      quantity,
    });
    if (updateCommande) {
      //   await updateCommande.save();
      res.status(201).json({ message: "commande a ete mise a jour" });
    } else {
      res.status(500).json({ message: "cannot update commande" });
    }
  } else {
    res.status(404).json({ message: "commande is not found" });
  }
};

// //récuperer des commande
exports.getAllCommande = async (req, res, next) => {
  const commandes = await Commande.find();
  if (commandes) res.status(201).json({ commandes });
  else res.status(404).json({ message: "commande not found" });
};
//récuperer des commande selon cette path
exports.getOneCommande = async (req, res, next) => {
  const { _id } = req.params;
  const commande = await Commande.findOne({ _id });
  if (commande) res.status(201).json({ commande });
  else res.status(404).json("not found");
};

exports.addCommandeToCategorie = async (req, res, next) => {
  const { _id } = req.params; //requieri f id
  const { categorie_id } = req.body;
  const result = await Commande.findByIdAndUpdate(
    _id,
    { $push: { categories: categorie_id } },
    { new: true, useFindAndModify: false }
  );

  if (result) {
    res.status(201).json({ result });
  } else {
    res.status(403).json({ error: "Commande cannot be created" });
  }
};

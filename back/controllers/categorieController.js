const Categorie = require("../models/CategorieModel");

exports.createCategorie = async (req, res, next) => {
  const { name } = req.body;

  const categorie = new Categorie({
    name,
  });
  if (categorie) {
    await categorie.save();
    res.status(201).json({ categorie });
  } else {
    res.status(403).json({ error: "Categorie cannot be created" });
  }
};

exports.deleteCategorie = async (req, res, next) => {
  const { _id } = req.params;
  const categorie = await Categorie.findById(_id);

  if (categorie) {
    await categorie.deleteOne({ _id });
    res.status(201).json({ msg: "categorie supprimer" });
  } else {
    res.status(404).json({ msg: "categorie not found" });
  }
};

exports.updateCategorie = async (req, res, next) => {
  const { _id } = req.params; //requieri f id
  const { name } = req.body;
  console.log(req.body)
 
    //  existence categorie
    const updateCategorie =Categorie.findOneAndUpdate({_id },{
      name
    }, { new: true },(err, contact) => {
      if (err) {
        console.log(err)
        res.status(400).json(err);
      }
    });
    if (updateCategorie) {
      //   await updateCategorie.save();
      res.status(201).json({ message: "categorie a ete mise a jour" });
    } else {
      res.status(500).json({ message: "cannot update categorie" });
    }
  
};

// //récuperer des categorie
exports.getAllCategorie = async (req, res, next) => {
  const categories = await Categorie.find();
  if (categories) res.status(201).json({ categories });
  else res.status(404).json({ message: "categorie not found" });
};
//récuperer des categorie selon cette path
exports.getOneCategorie = async (req, res, next) => {
  const { _id } = req.params;
  const categorie = await Categorie.findOne({ _id });
  if (categorie) res.status(201).json({ categorie });
  else res.status(404).json("not found");
};

const mongoose = require("mongoose");
const ProduitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categorie",
    },
  ],
});

const Produit = mongoose.model("Produit", ProduitSchema, "produits");
module.exports = Produit;

const mongoose = require("mongoose");
const CommaneSchema = new mongoose.Schema({
  prix: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const Commande = mongoose.model("Commande", CommaneSchema, "commandes");
module.exports = Commande;

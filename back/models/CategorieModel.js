const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  produit: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produit",
    },
  ],
});
const Category = mongoose.model("Category", CategorySchema, "categorys");
module.exports = Category;
